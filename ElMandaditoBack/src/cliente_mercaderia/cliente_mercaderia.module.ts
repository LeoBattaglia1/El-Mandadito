import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteMercaderia } from './entities/cliente_mercaderia.entity';
import { ClienteMercaderiaController } from './cliente_mercaderia.controller';
import { ClienteMercaderiaService } from './cliente_mercaderia.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteMercaderia])],
  controllers: [ClienteMercaderiaController],
  providers: [ClienteMercaderiaService],
})
export class ClienteMercaderiaModule {}
