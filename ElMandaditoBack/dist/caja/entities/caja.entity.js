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
exports.Caja = void 0;
const typeorm_1 = require("typeorm");
let Caja = class Caja {
    constructor(fecha, efectivo = 0, cuenta_dni = 0, fiado = 0) {
        this.fecha = fecha;
        this.efectivo = efectivo;
        this.cuenta_dni = cuenta_dni;
        this.fiado = fiado;
    }
    // Getters
    getId() {
        return this.id;
    }
    getFecha() {
        return this.fecha;
    }
    getEfectivo() {
        return this.efectivo;
    }
    getCuentaDni() {
        return this.cuenta_dni;
    }
    getFiado() {
        return this.fiado;
    }
    // Setters
    setId(id) {
        this.id = id;
    }
    setFecha(fecha) {
        this.fecha = fecha;
    }
    setEfectivo(valor) {
        this.efectivo = valor;
    }
    setCuentaDni(valor) {
        this.cuenta_dni = valor;
    }
    setFiado(valor) {
        this.fiado = valor;
    }
};
exports.Caja = Caja;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Caja.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Caja.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Caja.prototype, "efectivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Caja.prototype, "cuenta_dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Caja.prototype, "fiado", void 0);
exports.Caja = Caja = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Date, Object, Object, Object])
], Caja);
