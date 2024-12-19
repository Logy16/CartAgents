import { LanggraphService } from '../langgraph/langgraph.service';
export declare class CoordinatorService {
    private readonly langgraphService;
    constructor(langgraphService: LanggraphService);
    handleQuery(query: string): Promise<any>;
}
