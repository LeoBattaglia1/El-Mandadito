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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clientes_entity_1 = require("./entities/clientes.entity");
let ClientesService = class ClientesService {
    constructor(clientesRepository) {
        this.clientesRepository = clientesRepository;
    }
    async create(clientesDto) {
        // Verificar si ya existe un cliente con el mismo nombre
        const existingCliente = await this.clientesRepository.findOne({
            where: { Nombre: clientesDto.Nombre },
        });
        if (existingCliente) {
            // Si ya existe un cliente con el mismo nombre, lanzar una excepción o manejar el error
            throw new Error(`Ya existe un cliente con el nombre ${clientesDto.Nombre}`);
        }
        // Si no existe un cliente con el mismo nombre, proceder con la creación
        const cliente = this.clientesRepository.create(clientesDto);
        await this.clientesRepository.save(cliente);
        return cliente;
    }
    async findAll() {
        return this.clientesRepository.find();
    }
    async update(id, clientesDto) {
        const cliente = await this.clientesRepository.findOne({
            where: { ClienteID: id },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        await this.clientesRepository.update(id, clientesDto);
        // Cargar el cliente actualizado para devolverlo
        const clienteActualizado = await this.clientesRepository.findOne({
            where: { ClienteID: id },
        });
        if (!clienteActualizado) {
            throw new common_1.NotFoundException(`Cliente con ID ${id} no encontrado después de la actualización`);
        }
        return clienteActualizado;
    }
    async findOne(id) {
        const cliente = await this.clientesRepository.findOne({
            where: { ClienteID: id },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    }
    async remove(id) {
        const cliente = await this.clientesRepository.findOne({
            where: { ClienteID: id },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        await this.clientesRepository.remove(cliente);
        return true;
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clientes_entity_1.Clientes)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientesService);
