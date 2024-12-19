import { Module } from '@nestjs/common';
import { CartService } from './agents/cart/cart.service';
import { TavilyService } from './agents/tavily/tavily.service';
import { CoordinatorService } from './agents/coordinator/coordinator.service';
import { LanggraphService } from './agents/langgraph/langgraph.service';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [CartService, TavilyService, CoordinatorService, LanggraphService], 
})
export class AppModule {}