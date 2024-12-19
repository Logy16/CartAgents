"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let CartService = class CartService {
    constructor() {
        this.cartFilePath = path.join(__dirname, '../../../src/data/cart.json');
    }
    readCart() {
        if (fs.existsSync(this.cartFilePath)) {
            return JSON.parse(fs.readFileSync(this.cartFilePath, 'utf8'));
        }
        return [];
    }
    writeCart(cart) {
        fs.writeFileSync(this.cartFilePath, JSON.stringify(cart, null, 2));
    }
    addProduct(product) {
        const cart = this.readCart();
        product.id = (0, uuid_1.v4)();
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
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);
//# sourceMappingURL=cart.service.js.map