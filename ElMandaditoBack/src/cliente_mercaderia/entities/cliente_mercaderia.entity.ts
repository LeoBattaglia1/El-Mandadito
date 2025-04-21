import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Clientes } from '../../clientes/entities/clientes.entity';
import { Mercaderia } from '../../mercaderia/entities/mercaderia.entity';

@Entity()
export class ClienteMercaderia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Clientes, (cliente) => cliente.clienteMercaderias)
  @JoinColumn({ name: 'ClienteID' })
  cliente: Clientes;

  @ManyToOne(() => Mercaderia, (mercaderia) => mercaderia.clienteMercaderias)
  @JoinColumn({ name: 'codigo' })
  mercaderia: Mercaderia;

  @Column('decimal', { precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'date' })
  fecha: Date;

  constructor(
    cliente: Clientes,
    mercaderia: Mercaderia,
    cantidad: number,
    fecha: Date,
  ) {
    this.cliente = cliente;
    this.mercaderia = mercaderia;
    this.cantidad = cantidad;
    this.fecha = fecha;
  }
}
