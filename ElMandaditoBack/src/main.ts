import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para que el front (en puerto 3001) pueda hacer peticiones
  app.enableCors({
    origin: 'http://localhost:3001',
  });

  await app.listen(3000);
}
bootstrap();
