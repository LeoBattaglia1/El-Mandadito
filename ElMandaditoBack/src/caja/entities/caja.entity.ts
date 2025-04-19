import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Caja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'float', default: 0 })
  efectivo: number;

  @Column({ type: 'float', default: 0 })
  cuenta_dni: number;

  @Column({ type: 'float', default: 0 })
  fiado: number;

  constructor(fecha: Date, efectivo = 0, cuenta_dni = 0, fiado = 0) {
    this.fecha = fecha;
    this.efectivo = efectivo;
    this.cuenta_dni = cuenta_dni;
    this.fiado = fiado;
  }

  // Getters
  getId(): number {
    return this.id;
  }

  getFecha(): Date {
    return this.fecha;
  }

  getEfectivo(): number {
    return this.efectivo;
  }

  getCuentaDni(): number {
    return this.cuenta_dni;
  }

  getFiado(): number {
    return this.fiado;
  }

  // Setters
  setId(id: number): void {
    this.id = id;
  }

  setFecha(fecha: Date): void {
    this.fecha = fecha;
  }

  setEfectivo(valor: number): void {
    this.efectivo = valor;
  }

  setCuentaDni(valor: number): void {
    this.cuenta_dni = valor;
  }

  setFiado(valor: number): void {
    this.fiado = valor;
  }
}
