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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mercaderia = void 0;
const typeorm_1 = require("typeorm");
const cliente_mercaderia_entity_1 = require("../../cliente_mercaderia/entities/cliente_mercaderia.entity");
let Mercaderia = class Mercaderia {
    constructor(codigo, Nombre, Precio) {
        this.codigo = codigo;
        this.Nombre = Nombre;
        this.Precio = Precio;
    }
    // Getters
    getCodigo() {
        return this.codigo;
    }
    getNombre() {
        return this.Nombre;
    }
    getPrecio() {
        return this.Precio;
    }
    // Setters
    setNombre(Nombre) {
        this.Nombre = Nombre;
    }
    setPrecio(Precio) {
        this.Precio = Precio;
    }
};
exports.Mercaderia = Mercaderia;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Mercaderia.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mercaderia.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Mercaderia.prototype, "Precio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cliente_mercaderia_entity_1.ClienteMercaderia, (clienteMercaderia) => clienteMercaderia.mercaderia),
    __metadata("design:type", Array)
], Mercaderia.prototype, "clienteMercaderias", void 0);
exports.Mercaderia = Mercaderia = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, Number])
], Mercaderia);
