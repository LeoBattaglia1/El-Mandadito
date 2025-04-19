import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClienteMercaderia } from '../../cliente_mercaderia/entities/cliente_mercaderia.entity';

@Entity()
export class Clientes {
  @PrimaryGeneratedColumn()
  ClienteID: number;

  @Column()
  Nombre: string;

  @Column()
  Telefono: number;

  @Column()
  Direccion: string;

  @OneToMany(
    () => ClienteMercaderia,
    (clienteMercaderia) => clienteMercaderia.cliente,
  )
  clienteMercaderias: ClienteMercaderia[];

  constructor(nombre: string, telefono: number, direccion: string) {
    this.Nombre = nombre;
    this.Telefono = telefono;
    this.Direccion = direccion;
  }

  // Getters
  getClientesId(): number {
    return this.ClienteID;
  }

  getNombre(): string {
    return this.Nombre;
  }

  getTelefono(): number {
    return this.Telefono;
  }

  getDireccion(): string {
    return this.Direccion;
  }

  // Setters
  setNombre(nombre: string): void {
    this.Nombre = nombre;
  }

  setTelefono(telefono: number): void {
    this.Telefono = telefono;
  }

  setDireccion(direccion: string): void {
    this.Direccion = direccion;
  }
}
