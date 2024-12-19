import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class TavilyService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async searchProduct(query: string) {
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

}
