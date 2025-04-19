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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercaderiaController = void 0;
// src/mercaderia/mercaderia.controller.ts
const common_1 = require("@nestjs/common");
const mercaderia_service_1 = require("./mercaderia.service");
const mercaderia_dto_1 = require("./dto/mercaderia.dto");
let MercaderiaController = class MercaderiaController {
    constructor(mercaderiaService) {
        this.mercaderiaService = mercaderiaService;
    }
    async create(mercaderiaDto) {
        return this.mercaderiaService.create(mercaderiaDto);
    }
    async findAll() {
        return this.mercaderiaService.findAll();
    }
    async findOne(id) {
        return this.mercaderiaService.findOne(id);
    }
    async getMercaderiaByCodigo(codigo) {
        return this.mercaderiaService.findOneByCodigo(codigo);
    }
    async update(id, mercaderiaDto) {
        return this.mercaderiaService.update(id, mercaderiaDto);
    }
    async remove(id) {
        return await this.mercaderiaService.remove(id);
    }
};
exports.MercaderiaController = MercaderiaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mercaderia_dto_1.MercaderiaDto]),
    __metadata("design:returntype", Promise)
], MercaderiaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MercaderiaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MercaderiaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MercaderiaController.prototype, "getMercaderiaByCodigo", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mercaderia_dto_1.MercaderiaDto]),
    __metadata("design:returntype", Promise)
], MercaderiaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MercaderiaController.prototype, "remove", null);
exports.MercaderiaController = MercaderiaController = __decorate([
    (0, common_1.Controller)('mercaderia'),
    __metadata("design:paramtypes", [mercaderia_service_1.MercaderiaService])
], MercaderiaController);
