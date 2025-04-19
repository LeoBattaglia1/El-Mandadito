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
exports.CajaController = void 0;
const common_1 = require("@nestjs/common");
const caja_service_1 = require("./caja.service");
const caja_dto_1 = require("./dto/caja.dto");
let CajaController = class CajaController {
    constructor(cajaService) {
        this.cajaService = cajaService;
    }
    async create(cajaDto) {
        return await this.cajaService.create(cajaDto);
    }
    async findAll() {
        return this.cajaService.findAll();
    }
    // Ruta para buscar por ID
    async getById(id) {
        return this.cajaService.findOne(id);
    }
    // Ruta para buscar por fecha
    async getByFecha(fecha) {
        return this.cajaService.findByFecha(fecha);
    }
    // caja.controller.ts
    async actualizarEfectivo(fecha, body) {
        return this.cajaService.actualizarEfectivo(new Date(fecha), body.monto);
    }
    async actualizarFiado(fecha, body) {
        return this.cajaService.actualizarFiado(new Date(fecha), body.monto);
    }
    async actualizarCuentaDni(fecha, body) {
        return this.cajaService.actualizarCuentaDni(new Date(fecha), body.monto);
    }
    async remove(id) {
        return await this.cajaService.remove(+id);
    }
};
exports.CajaController = CajaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [caja_dto_1.CajaDto]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('fecha/:fecha'),
    __param(0, (0, common_1.Param)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "getByFecha", null);
__decorate([
    (0, common_1.Put)('actualizar/efectivo/:fecha'),
    __param(0, (0, common_1.Param)('fecha')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "actualizarEfectivo", null);
__decorate([
    (0, common_1.Put)('actualizar/fiado/:fecha'),
    __param(0, (0, common_1.Param)('fecha')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "actualizarFiado", null);
__decorate([
    (0, common_1.Put)('actualizar/cuentaDni/:fecha'),
    __param(0, (0, common_1.Param)('fecha')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "actualizarCuentaDni", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "remove", null);
exports.CajaController = CajaController = __decorate([
    (0, common_1.Controller)('caja'),
    __metadata("design:paramtypes", [caja_service_1.CajaService])
], CajaController);
