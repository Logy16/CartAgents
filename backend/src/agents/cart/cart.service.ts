import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  
  private cartFilePath = path.join(__dirname, '../../../src/data/cart.json');

  private readCart() {
    if (fs.existsSync(this.cartFilePath)) {
      return JSON.parse(fs.readFileSync(this.cartFilePath, 'utf8'));
    }
    return [];
  }

  private writeCart(cart) {
    fs.writeFileSync(this.cartFilePath, JSON.stringify(cart, null, 2));
  }

  addProduct(product) {
    const cart = this.readCart();
    product.id = uuidv4();
    cart.push(product);
    this.writeCart(cart);
  }

  removeProduct(productId) {
    let cart = this.readCart();
    cart = cart.filter(product => product.id !== productId);
    this.writeCart(cart);
  }

  listProducts() {
    return this.readCart();
  }
}
