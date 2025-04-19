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
exports.MercaderiaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mercaderia_entity_1 = require("./entities/mercaderia.entity");
let MercaderiaService = class MercaderiaService {
    constructor(mercaderiaRepository) {
        this.mercaderiaRepository = mercaderiaRepository;
    }
    async create(mercaderiaDto) {
        // Verificar si ya existe una mercadería con el mismo código
        const existingMercaderia = await this.mercaderiaRepository.findOne({
            where: { codigo: mercaderiaDto.codigo },
        });
        if (existingMercaderia) {
            // Si existe una mercadería con el mismo código, lanzar un error
            throw new common_1.ConflictException(`Ya existe una mercadería con el código ${mercaderiaDto.codigo}`);
        }
        // Si no existe, crear y guardar la nueva mercadería
        const mercaderia = this.mercaderiaRepository.create(mercaderiaDto);
        await this.mercaderiaRepository.save(mercaderia);
        return mercaderia;
    }
    async findAll() {
        return this.mercaderiaRepository.find();
    }
    async findOne(id) {
        const mercaderia = await this.mercaderiaRepository.findOne({
            where: { codigo: id },
        });
        if (!mercaderia) {
            throw new common_1.NotFoundException(`mercaderia con ID ${id} no encontrado`);
        }
        return mercaderia;
    }
    async findOneByCodigo(codigo) {
        return this.mercaderiaRepository.findOne({ where: { codigo } });
    }
    async update(id, mercaderiaDto) {
        const mercaderia = await this.mercaderiaRepository.findOne({
            where: { codigo: id },
        });
        if (!mercaderia) {
            throw new common_1.NotFoundException(`mercaderia con ID ${id} no encontrado`);
        }
        await this.mercaderiaRepository.update(id, mercaderiaDto);
        // Cargar el mercaderia actualizado para devolverlo
        const mercaderiaActualizado = await this.mercaderiaRepository.findOne({
            where: { codigo: id },
        });
        if (!mercaderiaActualizado) {
            throw new common_1.NotFoundException(`mercaderia con ID ${id} no encontrado después de la actualización`);
        }
        return mercaderiaActualizado;
    }
    async remove(id) {
        const mercaderia = await this.mercaderiaRepository.findOne({
            where: { codigo: id },
        });
        if (!mercaderia) {
            throw new common_1.NotFoundException(`mercaderia con ID ${id} no encontrado`);
        }
        await this.mercaderiaRepository.remove(mercaderia);
        return true;
    }
};
exports.MercaderiaService = MercaderiaService;
exports.MercaderiaService = MercaderiaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mercaderia_entity_1.Mercaderia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MercaderiaService);
