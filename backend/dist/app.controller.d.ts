import { CoordinatorService } from './agents/coordinator/coordinator.service';
export declare class AppController {
    private readonly coordinatorService;
    constructor(coordinatorService: CoordinatorService);
    invoke(query: string): Promise<string>;
}
