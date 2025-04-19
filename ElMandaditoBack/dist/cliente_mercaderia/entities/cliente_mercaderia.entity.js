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
exports.ClienteMercaderia = void 0;
const typeorm_1 = require("typeorm");
const clientes_entity_1 = require("../../clientes/entities/clientes.entity");
const mercaderia_entity_1 = require("../../mercaderia/entities/mercaderia.entity");
let ClienteMercaderia = class ClienteMercaderia {
    constructor(cliente, mercaderia, fecha) {
        this.cliente = cliente;
        this.mercaderia = mercaderia;
        this.fecha = fecha;
    }
};
exports.ClienteMercaderia = ClienteMercaderia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClienteMercaderia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clientes_entity_1.Clientes, (cliente) => cliente.clienteMercaderias),
    (0, typeorm_1.JoinColumn)({ name: 'ClienteID' }),
    __metadata("design:type", clientes_entity_1.Clientes)
], ClienteMercaderia.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mercaderia_entity_1.Mercaderia, (mercaderia) => mercaderia.clienteMercaderias),
    (0, typeorm_1.JoinColumn)({ name: 'codigo' }),
    __metadata("design:type", mercaderia_entity_1.Mercaderia)
], ClienteMercaderia.prototype, "mercaderia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ClienteMercaderia.prototype, "fecha", void 0);
exports.ClienteMercaderia = ClienteMercaderia = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [clientes_entity_1.Clientes, mercaderia_entity_1.Mercaderia, Date])
], ClienteMercaderia);
