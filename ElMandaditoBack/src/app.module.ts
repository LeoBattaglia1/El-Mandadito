import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercaderiaModule } from './mercaderia/mercaderia.module';
import { ClientesModule } from './clientes/clientes.module';
import { ClienteMercaderiaModule } from './cliente_mercaderia/cliente_mercaderia.module';
import { CajaModule } from './caja/caja.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Criticrew10',
      database: 'despensaelmandadito',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    MercaderiaModule,
    ClientesModule,
    ClienteMercaderiaModule,
    CajaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
