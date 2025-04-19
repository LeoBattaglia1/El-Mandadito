import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CajaController } from './caja.controller';
import { CajaService } from './caja.service';
import { Caja } from './entities/caja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Caja])], // Incluir la entidad Caja para usarla con TypeORM
  controllers: [CajaController], // Asociar el controlador con las rutas correspondientes
  providers: [CajaService], // Incluir el servicio para manejar la lógica de la caja
})
export class CajaModule {}
