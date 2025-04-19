import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClienteMercaderia } from '../../cliente_mercaderia/entities/cliente_mercaderia.entity';

@Entity()
export class Mercaderia {
  @PrimaryGeneratedColumn()
  codigo: string;

  @Column()
  Nombre: string;

  @Column()
  Precio: number;

  @OneToMany(
    () => ClienteMercaderia,
    (clienteMercaderia) => clienteMercaderia.mercaderia,
  )
  clienteMercaderias: ClienteMercaderia[];

  constructor(codigo: string, Nombre: string, Precio: number) {
    this.codigo = codigo;
    this.Nombre = Nombre;
    this.Precio = Precio;
  }

  // Getters
  getCodigo(): string {
    return this.codigo;
  }

  getNombre(): string {
    return this.Nombre;
  }

  getPrecio(): number {
    return this.Precio;
  }

  // Setters
  setNombre(Nombre: string): void {
    this.Nombre = Nombre;
  }

  setPrecio(Precio: number): void {
    this.Precio = Precio;
  }
}
