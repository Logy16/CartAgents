"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsModule = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart/cart.service");
const tavily_service_1 = require("./tavily/tavily.service");
const coordinator_service_1 = require("./coordinator/coordinator.service");
const langgraph_service_1 = require("./langgraph/langgraph.service");
let AgentsModule = class AgentsModule {
};
exports.AgentsModule = AgentsModule;
exports.AgentsModule = AgentsModule = __decorate([
    (0, common_1.Module)({
        providers: [cart_service_1.CartService, tavily_service_1.TavilyService, coordinator_service_1.CoordinatorService, langgraph_service_1.LanggraphService]
    })
], AgentsModule);
//# sourceMappingURL=agents.module.js.map