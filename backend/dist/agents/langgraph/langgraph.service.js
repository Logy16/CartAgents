"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanggraphService = void 0;
const common_1 = require("@nestjs/common");
const messages_1 = require("@langchain/core/messages");
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const openai_1 = require("@langchain/openai");
const langgraph_1 = require("@langchain/langgraph");
const langgraph_2 = require("@langchain/langgraph");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const cart_service_1 = require("../cart/cart.service");
let LanggraphService = class LanggraphService {
    constructor(cartService) {
        this.cartService = cartService;
        const StateAnnotation = langgraph_2.Annotation.Root({
            messages: (0, langgraph_2.Annotation)({
                reducer: langgraph_2.messagesStateReducer,
            }),
        });
        const addProductTool = (0, tools_1.tool)(async ({ name, url }) => {
            const product = { name, url };
            this.cartService.addProduct(product);
            return `Le produit "${name}" a été ajouté au panier.`;
        }, {
            name: "addProduct",
            description: "Ajouter un produit au panier.",
            schema: zod_1.z.object({
                name: zod_1.z.string().describe("Le nom du produit."),
                url: zod_1.z.string().describe("L'URL du produit."),
            }),
        });
        const removeProductTool = (0, tools_1.tool)(async ({ productName }) => {
            ;
            const product = this.cartService.listProducts().find(product => product.name.toLowerCase().includes(productName.toLowerCase()));
            if (product) {
                this.cartService.removeProduct(product.id);
                return `Le produit "${product.name}" a été supprimé du panier.`;
            }
            else {
                return `Le produit "${productName}" n'a pas été trouvé dans le panier.`;
            }
        }, {
            name: "removeProduct",
            description: "Supprimer un produit du panier par nom.",
            schema: zod_1.z.object({
                productName: zod_1.z.string().describe("Le nom du produit à supprimer."),
            }),
        });
        const listProductsTool = (0, tools_1.tool)(async () => {
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
        const toolNode = new prebuilt_1.ToolNode(tools);
        this.model = new openai_1.ChatOpenAI({
            modelName: "gpt-3.5-turbo",
            temperature: 0,
        }).bindTools(tools);
        const shouldContinue = (state) => {
            const messages = state.messages;
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.tool_calls?.length) {
                return "tools";
            }
            return "__end__";
        };
        const callModel = async (state) => {
            const messages = state.messages;
            const response = await this.model.invoke(messages);
            return { messages: [response] };
        };
        this.workflow = new langgraph_1.StateGraph(StateAnnotation)
            .addNode("agent", callModel)
            .addNode("tools", toolNode)
            .addEdge("__start__", "agent")
            .addConditionalEdges("agent", shouldContinue)
            .addEdge("tools", "agent");
        this.checkpointer = new langgraph_2.MemorySaver();
        this.workflow = this.workflow.compile({ checkpointer: this.checkpointer });
    }
    async executeGraph(query) {
        const finalState = await this.workflow.invoke({ messages: [new messages_1.HumanMessage(query)] }, { configurable: { thread_id: "42" } });
        return finalState.messages[finalState.messages.length - 1].content;
    }
};
exports.LanggraphService = LanggraphService;
exports.LanggraphService = LanggraphService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], LanggraphService);
//# sourceMappingURL=langgraph.service.js.map