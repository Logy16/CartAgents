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
exports.CoordinatorService = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("../cart/cart.service");
const tavily_service_1 = require("../tavily/tavily.service");
let CoordinatorService = class CoordinatorService {
    constructor(cartService, tavilyService) {
        this.cartService = cartService;
        this.tavilyService = tavilyService;
    }
    async handleQuery(query) {
        if (query.includes('acheter')) {
            const searchQuery = query.match(/chercher (.+?)$/)[1];
            const productDetails = await this.tavilyService.searchProduct(searchQuery);
            const product = JSON.parse(productDetails);
            this.cartService.addProduct(product);
            return `Le produit "${product.name}" a été ajouté au panier depuis ${product.url}.`;
        }
        else if (query.includes('supprimer')) {
            const match = query.match(/supprimer ["'](.+?)["']/);
            if (match) {
                const productName = match[1];
                const product = this.cartService.listProducts().find(product => product.name.toLowerCase().includes(productName.toLowerCase()));
                if (product) {
                    this.cartService.removeProduct(product.id);
                    return `Le produit "${product.name}" a été supprimé du panier.`;
                }
                else {
                    return `Le produit "${productName}" n'a pas été trouvé dans le panier.`;
                }
            }
            else {
                return 'Requête non reconnue.';
            }
        }
        else if (query.includes('Affiche mon panier')) {
            const cart = this.cartService.listProducts();
            if (cart.length === 0) {
                return 'Le panier est vide.';
            }
            return `Votre panier contient les articles suivants : ${cart.map(item => `${item.name} - [Lien](${item.url})`).join(', ')}`;
        }
        return 'Requête non reconnue.';
    }
};
exports.CoordinatorService = CoordinatorService;
exports.CoordinatorService = CoordinatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_service_1.CartService,
        tavily_service_1.TavilyService])
], CoordinatorService);
//# sourceMappingURL=coordinator.service.js.map