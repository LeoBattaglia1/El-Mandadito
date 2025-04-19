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
exports.CajaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const caja_entity_1 = require("./entities/caja.entity");
let CajaService = class CajaService {
    constructor(cajaRepository) {
        this.cajaRepository = cajaRepository;
    }
    // Crear una nueva entrada para una fecha
    async create(cajaDto) {
        try {
            // Verificar si ya existe una entrada en la caja para la fecha actual
            const existingEntry = await this.cajaRepository.findOne({
                where: { fecha: cajaDto.fecha },
            });
            if (existingEntry) {
                // Si ya existe una entrada para la fecha actual, lanzamos una excepción
                throw new common_1.NotFoundException('Ya existe una entrada en la caja para la fecha actual.');
            }
            // Creamos la nueva entrada en la caja
            const caja = this.cajaRepository.create(cajaDto);
            await this.cajaRepository.save(caja);
            return caja;
        }
        catch (error) {
            throw new Error(`Error al crear la entrada en la caja: ${error.message}`);
        }
    }
    // caja.service.ts
    async actualizarEfectivo(fecha, monto) {
        const caja = await this.cajaRepository.findOne({
            where: {
                fecha: (0, typeorm_2.Raw)((alias) => `DATE(${alias}) = :fecha`, {
                    fecha: fecha.toISOString().split('T')[0],
                }),
            },
        });
        if (!caja) {
            throw new common_1.NotFoundException(`Caja con la fecha ${fecha.toISOString().split('T')[0]} no encontrada`);
        }
        caja.efectivo += monto;
        await this.cajaRepository.save(caja);
        return {
            message: 'Campo "efectivo" actualizado correctamente',
            data: caja,
        };
    }
    async actualizarFiado(fecha, monto) {
        const caja = await this.cajaRepository.findOne({
            where: {
                fecha: (0, typeorm_2.Raw)((alias) => `DATE(${alias}) = :fecha`, {
                    fecha: fecha.toISOString().split('T')[0],
                }),
            },
        });
        if (!caja) {
            throw new common_1.NotFoundException(`Caja con la fecha ${fecha.toISOString().split('T')[0]} no encontrada`);
        }
        caja.fiado += monto;
        await this.cajaRepository.save(caja);
        return {
            message: 'Campo "Fiado" actualizado correctamente',
            data: caja,
        };
    }
    async actualizarCuentaDni(fecha, monto) {
        const caja = await this.cajaRepository.findOne({
            where: {
                fecha: (0, typeorm_2.Raw)((alias) => `DATE(${alias}) = :fecha`, {
                    fecha: fecha.toISOString().split('T')[0],
                }),
            },
        });
        if (!caja) {
            throw new common_1.NotFoundException(`Caja con la fecha ${fecha.toISOString().split('T')[0]} no encontrada`);
        }
        caja.cuenta_dni += monto;
        await this.cajaRepository.save(caja);
        return {
            message: 'Campo "cuenta dni" actualizado correctamente',
            data: caja,
        };
    }
    // Obtener todas las entradas de la caja
    async findAll() {
        return this.cajaRepository.find();
    }
    async findByFecha(fecha) {
        // Realizar la búsqueda en la base de datos comparando la fecha como cadena
        const resultado = await this.cajaRepository.findOne({
            where: {
                fecha: (0, typeorm_2.Raw)((alias) => `${alias} = :fecha`, { fecha }),
            },
        });
        return !!resultado;
    }
    // Obtener una entrada de la caja por su ID
    async findOne(id) {
        const caja = await this.cajaRepository.findOne({
            where: { id: id },
        });
        if (!caja) {
            throw new common_1.NotFoundException(`Caja con ID ${id} no encontrada`);
        }
        return caja;
    }
    // Eliminar una entrada de la caja
    async remove(id) {
        const caja = await this.cajaRepository.findOne({
            where: { id: id },
        });
        if (!caja) {
            throw new common_1.NotFoundException(`Caja con ID ${id} no encontrada`);
        }
        await this.cajaRepository.remove(caja);
        return true;
    }
};
exports.CajaService = CajaService;
exports.CajaService = CajaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(caja_entity_1.Caja)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CajaService);
