import { CartService } from '../cart/cart.service';
export declare class LanggraphService {
    private readonly cartService;
    private model;
    private workflow;
    private checkpointer;
    constructor(cartService: CartService);
    executeGraph(query: string): Promise<any>;
}
