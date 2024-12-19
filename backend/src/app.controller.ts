import { Controller, Get, Query } from '@nestjs/common';
import { CoordinatorService } from './agents/coordinator/coordinator.service';

@Controller()
export class AppController {
  constructor(private readonly coordinatorService: CoordinatorService) {}

  @Get('/invoke')
  async invoke(@Query('query') query: string): Promise<string> {
    return this.coordinatorService.handleQuery(query);
  }
}