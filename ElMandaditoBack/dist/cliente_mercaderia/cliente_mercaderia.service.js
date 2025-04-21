"use strict";
// cliente-mercaderia.service.ts
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
exports.ClienteMercaderiaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_mercaderia_entity_1 = require("./entities/cliente_mercaderia.entity");
// cliente-mercaderia.service.ts
let ClienteMercaderiaService = class ClienteMercaderiaService {
    constructor(clienteMercaderiaRepository) {
        this.clienteMercaderiaRepository = clienteMercaderiaRepository;
    }
    async create(clienteID, codigo, cantidad, fecha) {
        const clienteMercaderia = this.clienteMercaderiaRepository.create({
            cliente: { ClienteID: clienteID },
            mercaderia: { codigo },
            cantidad,
            fecha,
        });
        return await this.clienteMercaderiaRepository.save(clienteMercaderia);
    }
    async findAll() {
        return this.clienteMercaderiaRepository.find();
    }
    async getMercaderiasPorClienteID(clienteID) {
        const clienteMercaderias = await this.clienteMercaderiaRepository.find({
            where: { cliente: { ClienteID: clienteID } },
            relations: ['mercaderia'],
        });
        return clienteMercaderias.map((clienteMercaderia) => {
            const mercaderia = clienteMercaderia.mercaderia;
            return {
                Nombre: mercaderia?.Nombre || 'Sin nombre',
                precio: mercaderia?.Precio || 0,
                fecha: clienteMercaderia.fecha,
                cantidad: clienteMercaderia.cantidad,
                codigo: mercaderia?.codigo || '',
            };
        });
    }
    async getIdsClienteMercaderiaPorClienteID(clienteID) {
        const clienteMercaderias = await this.clienteMercaderiaRepository.find({
            select: ['id'],
            where: { cliente: { ClienteID: clienteID } },
        });
        return clienteMercaderias.map((clienteMercaderia) => clienteMercaderia.id);
    }
    // NUEVA FUNCION PARA OBTENER LOS IDs POR CLIENTEID Y CODIGO
    async getIdsClienteMercaderiaPorClienteIDyCodigo(clienteID, codigo) {
        const clienteMercaderias = await this.clienteMercaderiaRepository.find({
            where: {
                cliente: { ClienteID: clienteID },
                mercaderia: { codigo: codigo },
            },
            select: ['id'],
        });
        return clienteMercaderias.map((clienteMercaderia) => clienteMercaderia.id);
    }
    async contarRegistrosPorClienteID(clienteID) {
        return await this.clienteMercaderiaRepository.count({
            where: { cliente: { ClienteID: clienteID } },
        });
    }
    async remove(id) {
        const clienteMercaderia = await this.clienteMercaderiaRepository.findOne({
            where: { id },
        });
        if (!clienteMercaderia) {
            throw new common_1.NotFoundException(`Relación Cliente-Mercaderia con ID ${id} no encontrada`);
        }
        await this.clienteMercaderiaRepository.remove(clienteMercaderia);
        return true;
    }
    async removeByClienteIDAndCodigo(clienteID, codigo) {
        const result = await this.clienteMercaderiaRepository.delete({
            cliente: { ClienteID: clienteID },
            mercaderia: { codigo: codigo },
        });
        if (result.affected === 0) {
            throw new Error(`No se encontraron registros para eliminar con ClienteID: ${clienteID} y código: ${codigo}`);
        }
    }
    async removeAllByClienteID(clienteID) {
        await this.clienteMercaderiaRepository.delete({
            cliente: { ClienteID: clienteID },
        });
    }
};
exports.ClienteMercaderiaService = ClienteMercaderiaService;
exports.ClienteMercaderiaService = ClienteMercaderiaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_mercaderia_entity_1.ClienteMercaderia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClienteMercaderiaService);
