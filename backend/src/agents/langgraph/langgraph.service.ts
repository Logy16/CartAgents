// src/langgraph/langgraph.service.ts
import { Injectable } from '@nestjs/common';
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver, Annotation, messagesStateReducer } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { CartService } from '../cart/cart.service';

@Injectable()
export class LanggraphService {
  private model;
  private workflow;
  private checkpointer;

  constructor(private readonly cartService: CartService) {
    // Define the graph state
    const StateAnnotation = Annotation.Root({
      messages: Annotation<BaseMessage[]>({
        reducer: messagesStateReducer,
      }),
    });

    // Define the tools for the agent to use
    const addProductTool = tool(async ({ name, url }) => {
      const product = { name, url };
      this.cartService.addProduct(product);
      return `Le produit "${name}" a été ajouté au panier.`;
    }, {
      name: "addProduct",
      description: "Ajouter un produit au panier.",
      schema: z.object({
        name: z.string().describe("Le nom du produit."),
        url: z.string().describe("L'URL du produit."),
      }),
    });

    const removeProductTool = tool(async ({ productId }) => {
      this.cartService.removeProduct(productId);
      return `Le produit a été supprimé du panier.`;
    }, {
      name: "removeProduct",
      description: "Supprimer un produit du panier.",
      schema: z.object({
        productId: z.string().describe("L'ID du produit à supprimer."),
      }),
    });

    const listProductsTool = tool(async () => {
      const cart = this.cartService.listProducts();
      if (cart.length === 0) {
        return 'Le panier est vide.';
      }
      return `Votre panier contient les articles suivants : ${cart.map(item => `${item.name} - [Lien](${item.url})`).join(', ')}`;
    }, {
      name: "listProducts",
      description: "Lister les produits dans le panier.",
    });

    const tools = [addProductTool, removeProductTool, listProductsTool];
    const toolNode = new ToolNode(tools);

    this.model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    }).bindTools(tools);

    // Define the function that determines whether to continue or not
    const shouldContinue = (state: typeof StateAnnotation.State) => {
      const messages = state.messages;
      const lastMessage = messages[messages.length - 1] as AIMessage;

      if (lastMessage.tool_calls?.length) {
        return "tools";
      }
      return "__end__";
    };

    // Define the function that calls the model
    const callModel = async (state: typeof StateAnnotation.State) => {
      const messages = state.messages;
      const response = await this.model.invoke(messages);
      return { messages: [response] };
    };

    // Define a new graph
    this.workflow = new StateGraph(StateAnnotation)
      .addNode("agent", callModel)
      .addNode("tools", toolNode)
      .addEdge("__start__", "agent")
      .addConditionalEdges("agent", shouldContinue)
      .addEdge("tools", "agent");

    // Initialize memory to persist state between graph runs
    this.checkpointer = new MemorySaver();

    // Compile the workflow
    this.workflow = this.workflow.compile({ checkpointer: this.checkpointer });
  }

  async executeGraph(query: string) {
    const finalState = await this.workflow.invoke(
      { messages: [new HumanMessage(query)] },
      { configurable: { thread_id: "42" } }
    );
    return finalState.messages[finalState.messages.length - 1].content;
  }
}
