"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercaderiaModule = void 0;
// src/mercaderia/mercaderia.module.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mercaderia_controller_1 = require("./mercaderia.controller");
const mercaderia_service_1 = require("./mercaderia.service");
const mercaderia_entity_1 = require("./entities/mercaderia.entity");
let MercaderiaModule = class MercaderiaModule {
};
exports.MercaderiaModule = MercaderiaModule;
exports.MercaderiaModule = MercaderiaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([mercaderia_entity_1.Mercaderia])],
        controllers: [mercaderia_controller_1.MercaderiaController],
        providers: [mercaderia_service_1.MercaderiaService],
    })
], MercaderiaModule);
