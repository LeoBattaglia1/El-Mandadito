"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const mercaderia_module_1 = require("./mercaderia/mercaderia.module");
const clientes_module_1 = require("./clientes/clientes.module");
const cliente_mercaderia_module_1 = require("./cliente_mercaderia/cliente_mercaderia.module");
const caja_module_1 = require("./caja/caja.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Criticrew10',
                database: 'despensaelmandadito',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
            }),
            mercaderia_module_1.MercaderiaModule,
            clientes_module_1.ClientesModule,
            cliente_mercaderia_module_1.ClienteMercaderiaModule,
            caja_module_1.CajaModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
