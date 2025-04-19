import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CajaDto } from './dto/caja.dto';
import { Caja } from './entities/caja.entity';

@Injectable()
export class CajaService {
  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
  ) {}

  // Crear una nueva entrada para una fecha
  async create(cajaDto: CajaDto): Promise<CajaDto> {
    try {
      // Verificar si ya existe una entrada en la caja para la fecha actual
      const existingEntry = await this.cajaRepository.findOne({
        where: { fecha: cajaDto.fecha },
      });

      if (existingEntry) {
        // Si ya existe una entrada para la fecha actual, lanzamos una excepción
        throw new NotFoundException(
          'Ya existe una entrada en la caja para la fecha actual.',
        );
      }

      // Creamos la nueva entrada en la caja
      const caja = this.cajaRepository.create(cajaDto);
      await this.cajaRepository.save(caja);
      return caja;
    } catch (error) {
      throw new Error(`Error al crear la entrada en la caja: ${error.message}`);
    }
  }

  // caja.service.ts
  async actualizarEfectivo(fecha: Date, monto: number): Promise<any> {
    const caja = await this.cajaRepository.findOne({
      where: {
        fecha: Raw((alias) => `DATE(${alias}) = :fecha`, {
          fecha: fecha.toISOString().split('T')[0],
        }),
      },
    });

    if (!caja) {
      throw new NotFoundException(
        `Caja con la fecha ${fecha.toISOString().split('T')[0]} no encontrada`,
      );
    }

    caja.efectivo += monto;
    await this.cajaRepository.save(caja);

    return {
      message: 'Campo "efectivo" actualizado correctamente',
      data: caja,
    };
  }

  async actualizarFiado(fecha: Date, monto: number): Promise<any> {
    const caja = await this.cajaRepository.findOne({
      where: {
        fecha: Raw((alias) => `DATE(${alias}) = :fecha`, {
          fecha: fecha.toISOString().split('T')[0],
        }),
      },
    });

    if (!caja) {
      throw new NotFoundException(
        `Caja con la fecha ${fecha.toISOString().split('T')[0]} no encontrada`,
      );
    }

    caja.fiado += monto;
    await this.cajaRepository.save(caja);

    return {
      message: 'Campo "Fiado" actualizado correctamente',
      data: caja,
    };
  }

  async actualizarCuentaDni(fecha: Date, monto: number): Promise<any> {
    const caja = await this.cajaRepository.findOne({
      where: {
        fecha: Raw((alias) => `DATE(${alias}) = :fecha`, {
          fecha: fecha.toISOString().split('T')[0],
        }),
      },
    });

    if (!caja) {
      throw new NotFoundException(
        `Caja con la fecha ${fecha.toISOString().split('T')[0]} no encontrada`,
      );
    }

    caja.cuenta_dni += monto;
    await this.cajaRepository.save(caja);

    return {
      message: 'Campo "cuenta dni" actualizado correctamente',
      data: caja,
    };
  }

  // Obtener todas las entradas de la caja
  async findAll(): Promise<CajaDto[]> {
    return this.cajaRepository.find();
  }

  async findByFecha(fecha: string): Promise<boolean> {
    // Realizar la búsqueda en la base de datos comparando la fecha como cadena
    const resultado = await this.cajaRepository.findOne({
      where: {
        fecha: Raw((alias) => `${alias} = :fecha`, { fecha }),
      },
    });

    return !!resultado;
  }

  // Obtener una entrada de la caja por su ID
  async findOne(id: number): Promise<CajaDto> {
    const caja = await this.cajaRepository.findOne({
      where: { id: id },
    });

    if (!caja) {
      throw new NotFoundException(`Caja con ID ${id} no encontrada`);
    }

    return caja as CajaDto;
  }

  // Eliminar una entrada de la caja
  async remove(id: number): Promise<boolean> {
    const caja = await this.cajaRepository.findOne({
      where: { id: id },
    });

    if (!caja) {
      throw new NotFoundException(`Caja con ID ${id} no encontrada`);
    }

    await this.cajaRepository.remove(caja);
    return true;
  }
}
