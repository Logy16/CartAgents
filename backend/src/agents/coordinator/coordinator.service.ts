import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { TavilyService } from '../tavily/tavily.service';

@Injectable()
export class CoordinatorService {
  constructor(
    private readonly cartService: CartService,
    private readonly tavilyService: TavilyService,
  ) {}

  async handleQuery(query: string) {
    if (query.includes('acheter')) {
      const searchQuery = query.match(/chercher (.+?)$/)[1];
      const productDetails = await this.tavilyService.searchProduct(searchQuery);
      const product = JSON.parse(productDetails);
      this.cartService.addProduct(product);
      return `Le produit "${product.name}" a été ajouté au panier depuis ${product.url}.`;
    } else if (query.includes('supprimer')) {
      const match = query.match(/supprimer ["'](.+?)["']/);
      if (match) {
        const productName = match[1];
        const product = this.cartService.listProducts().find(product =>
          product.name.toLowerCase().includes(productName.toLowerCase())
        );
        if (product) {
          this.cartService.removeProduct(product.id);
          return `Le produit "${product.name}" a été supprimé du panier.`;
        } else {
          return `Le produit "${productName}" n'a pas été trouvé dans le panier.`;
        }
      } else {
        return 'Requête non reconnue.';
      }
    } else if (query.includes('Affiche mon panier')) {
      const cart = this.cartService.listProducts();
      if (cart.length === 0) {
        return 'Le panier est vide.';
      }
      return `Votre panier contient les articles suivants : ${cart.map(item => `${item.name} - [Lien](${item.url})`).join(', ')}`;
    }
    return 'Requête non reconnue.';
  }

}
