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

  @Column({ type: 'date' })
  fecha: Date;

  constructor(cliente: Clientes, mercaderia: Mercaderia, fecha: Date) {
    this.cliente = cliente;
    this.mercaderia = mercaderia;
    this.fecha = fecha;
  }
}
