"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./agents/cart/cart.service");
const tavily_service_1 = require("./agents/tavily/tavily.service");
const coordinator_service_1 = require("./agents/coordinator/coordinator.service");
const langgraph_service_1 = require("./agents/langgraph/langgraph.service");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [cart_service_1.CartService, tavily_service_1.TavilyService, coordinator_service_1.CoordinatorService, langgraph_service_1.LanggraphService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map