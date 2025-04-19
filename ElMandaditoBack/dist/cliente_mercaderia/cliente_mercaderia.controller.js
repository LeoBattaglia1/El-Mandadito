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
exports.ClienteMercaderiaController = void 0;
const common_1 = require("@nestjs/common");
const cliente_mercaderia_service_1 = require("./cliente_mercaderia.service");
let ClienteMercaderiaController = class ClienteMercaderiaController {
    constructor(clienteMercaderiaService) {
        this.clienteMercaderiaService = clienteMercaderiaService;
    }
    async create(clienteID, codigo, fecha) {
        return this.clienteMercaderiaService.create(clienteID, codigo, fecha);
    }
    findAll() {
        return this.clienteMercaderiaService.findAll();
    }
    async getMercaderiasPorClienteID(clienteID) {
        return this.clienteMercaderiaService.getMercaderiasPorClienteID(clienteID);
    }
    async getIdsClienteMercaderia(clienteID) {
        return this.clienteMercaderiaService.getIdsClienteMercaderiaPorClienteID(clienteID);
    }
    // Nuevo endpoint para obtener los IDs por clienteID y codigo
    async getIdsClienteMercaderiaPorClienteIDyCodigo(clienteID, codigo) {
        return this.clienteMercaderiaService.getIdsClienteMercaderiaPorClienteIDyCodigo(clienteID, codigo);
    }
    async remove(id) {
        return this.clienteMercaderiaService.remove(+id);
    }
    async eliminarTodosPorCliente(clienteID) {
        await this.clienteMercaderiaService.removeAllByClienteID(clienteID);
        return { message: 'Todos los registros del cliente fueron eliminados' };
    }
    async removeByClienteIDAndCodigo(clienteID, codigo) {
        await this.clienteMercaderiaService.removeByClienteIDAndCodigo(clienteID, codigo);
    }
    async contarPorCliente(clienteID) {
        const count = await this.clienteMercaderiaService.contarRegistrosPorClienteID(clienteID);
        return { count };
    }
};
exports.ClienteMercaderiaController = ClienteMercaderiaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('ClienteID')),
    __param(1, (0, common_1.Body)('codigo')),
    __param(2, (0, common_1.Body)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Date]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClienteMercaderiaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('mercaderias/:ClienteID'),
    __param(0, (0, common_1.Param)('ClienteID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "getMercaderiasPorClienteID", null);
__decorate([
    (0, common_1.Get)(':clienteID/ids'),
    __param(0, (0, common_1.Param)('clienteID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "getIdsClienteMercaderia", null);
__decorate([
    (0, common_1.Get)(':clienteID/mercaderias/:codigo/ids'),
    __param(0, (0, common_1.Param)('clienteID')),
    __param(1, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "getIdsClienteMercaderiaPorClienteIDyCodigo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('eliminar/:clienteID'),
    __param(0, (0, common_1.Param)('clienteID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "eliminarTodosPorCliente", null);
__decorate([
    (0, common_1.Delete)(':clienteID/mercaderias/:codigo'),
    __param(0, (0, common_1.Param)('clienteID')),
    __param(1, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "removeByClienteIDAndCodigo", null);
__decorate([
    (0, common_1.Get)('count/:clienteID'),
    __param(0, (0, common_1.Param)('clienteID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteMercaderiaController.prototype, "contarPorCliente", null);
exports.ClienteMercaderiaController = ClienteMercaderiaController = __decorate([
    (0, common_1.Controller)('cliente_mercaderia'),
    __metadata("design:paramtypes", [cliente_mercaderia_service_1.ClienteMercaderiaService])
], ClienteMercaderiaController);
