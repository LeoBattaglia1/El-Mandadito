// src/mercaderia/mercaderia.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercaderiaController } from './mercaderia.controller';
import { MercaderiaService } from './mercaderia.service';
import { Mercaderia } from './entities/mercaderia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mercaderia])],
  controllers: [MercaderiaController],
  providers: [MercaderiaService],
})
export class MercaderiaModule {}
