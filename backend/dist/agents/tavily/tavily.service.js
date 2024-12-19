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
exports.TavilyService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let TavilyService = class TavilyService {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async searchProduct(query) {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Recherche de produits : ${query}.
          Si aucun nom de magasin ne t'est fourni, trouve un magasin qui pourrait avoir ce produit.
          Si tu ne peux pas trouver le lien du produit, invente un lien réaliste.
          Retourne les détails du produit au format JSON avec les champs "name" et "url"`,
                },
            ],
            max_tokens: 150,
        });
        return response.choices[0].message.content;
    }
};
exports.TavilyService = TavilyService;
exports.TavilyService = TavilyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TavilyService);
//# sourceMappingURL=tavily.service.js.map