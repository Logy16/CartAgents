import { CartService } from '../cart/cart.service';
import { TavilyService } from '../tavily/tavily.service';
export declare class CoordinatorService {
    private readonly cartService;
    private readonly tavilyService;
    constructor(cartService: CartService, tavilyService: TavilyService);
    handleQuery(query: string): Promise<string>;
}
