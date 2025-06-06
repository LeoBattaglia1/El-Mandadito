"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Habilita CORS para que el front (en puerto 3001) pueda hacer peticiones
    app.enableCors({
        origin: 'http://localhost:3001',
    });
    await app.listen(3000);
}
bootstrap();
