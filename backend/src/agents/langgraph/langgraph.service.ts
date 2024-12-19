import { Injectable } from '@nestjs/common';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { MemorySaver } from '@langchain/langgraph';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';

@Injectable()
export class LanggraphService {
  private agent;

  constructor() {
    const agentModel = new ChatOpenAI({ temperature: 0 });
    const agentCheckpointer = new MemorySaver();
    /*const agentTools = [new TavilySearchResults({ maxResults: 3 })];

    this.agent = createReactAgent({
      llm: agentModel,
      tools: agentTools,
      checkpointSaver: agentCheckpointer,
    });*/
  }

  async invokeAgent(query: string) {
    return this.agent.invoke({ query });
  }
}
