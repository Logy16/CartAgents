import { Module } from '@nestjs/common';
import { CartService } from './cart/cart.service';
import { TavilyService } from './tavily/tavily.service';
import { CoordinatorService } from './coordinator/coordinator.service';
import { LanggraphService } from './langgraph/langgraph.service';

@Module({
  providers: [CartService, TavilyService, CoordinatorService, LanggraphService]
})
export class AgentsModule {}
