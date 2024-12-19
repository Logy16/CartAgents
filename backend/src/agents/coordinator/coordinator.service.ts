import { Injectable } from '@nestjs/common';
import { LanggraphService } from '../langgraph/langgraph.service';

@Injectable()
export class CoordinatorService {
  constructor(
    private readonly langgraphService: LanggraphService,
  ) {}

  async handleQuery(query: string) {
    return this.langgraphService.executeGraph(query);
  }

}
