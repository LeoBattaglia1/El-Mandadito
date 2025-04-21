// cliente-mercaderia.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteMercaderia } from './entities/cliente_mercaderia.entity';

// cliente-mercaderia.service.ts

@Injectable()
export class ClienteMercaderiaService {
  constructor(
    @InjectRepository(ClienteMercaderia)
    private readonly clienteMercaderiaRepository: Repository<ClienteMercaderia>,
  ) {}

  async create(
    clienteID: number,
    codigo: string,
    cantidad: number,
    fecha: Date,
  ): Promise<ClienteMercaderia> {
    const clienteMercaderia = this.clienteMercaderiaRepository.create({
      cliente: { ClienteID: clienteID },
      mercaderia: { codigo },
      cantidad,
      fecha,
    });
    return await this.clienteMercaderiaRepository.save(clienteMercaderia);
  }

  async findAll(): Promise<ClienteMercaderia[]> {
    return this.clienteMercaderiaRepository.find();
  }

  async getMercaderiasPorClienteID(
    clienteID: number,
  ): Promise<{ Nombre: string; precio: number }[]> {
    const clienteMercaderias = await this.clienteMercaderiaRepository.find({
      where: { cliente: { ClienteID: clienteID } },
      relations: ['mercaderia'],
    });

    return clienteMercaderias.map((clienteMercaderia) => {
      const mercaderia = clienteMercaderia.mercaderia;
      return {
        Nombre: mercaderia?.Nombre || 'Sin nombre',
        precio: mercaderia?.Precio || 0,
        fecha: clienteMercaderia.fecha,
        cantidad: clienteMercaderia.cantidad,
        codigo: mercaderia?.codigo || '',
      };
    });
  }

  async getIdsClienteMercaderiaPorClienteID(
    clienteID: number,
  ): Promise<number[]> {
    const clienteMercaderias = await this.clienteMercaderiaRepository.find({
      select: ['id'],
      where: { cliente: { ClienteID: clienteID } },
    });

    return clienteMercaderias.map((clienteMercaderia) => clienteMercaderia.id);
  }

  // NUEVA FUNCION PARA OBTENER LOS IDs POR CLIENTEID Y CODIGO
  async getIdsClienteMercaderiaPorClienteIDyCodigo(
    clienteID: number,
    codigo: string,
  ): Promise<number[]> {
    const clienteMercaderias = await this.clienteMercaderiaRepository.find({
      where: {
        cliente: { ClienteID: clienteID },
        mercaderia: { codigo: codigo },
      },
      select: ['id'],
    });

    return clienteMercaderias.map((clienteMercaderia) => clienteMercaderia.id);
  }
  async contarRegistrosPorClienteID(clienteID: number): Promise<number> {
    return await this.clienteMercaderiaRepository.count({
      where: { cliente: { ClienteID: clienteID } },
    });
  }

  async remove(id: number): Promise<boolean> {
    const clienteMercaderia = await this.clienteMercaderiaRepository.findOne({
      where: { id },
    });

    if (!clienteMercaderia) {
      throw new NotFoundException(
        `Relación Cliente-Mercaderia con ID ${id} no encontrada`,
      );
    }

    await this.clienteMercaderiaRepository.remove(clienteMercaderia);
    return true;
  }

  async removeByClienteIDAndCodigo(
    clienteID: number,
    codigo: string,
  ): Promise<void> {
    const result = await this.clienteMercaderiaRepository.delete({
      cliente: { ClienteID: clienteID },
      mercaderia: { codigo: codigo },
    });

    if (result.affected === 0) {
      throw new Error(
        `No se encontraron registros para eliminar con ClienteID: ${clienteID} y código: ${codigo}`,
      );
    }
  }

  async removeAllByClienteID(clienteID: number): Promise<void> {
    await this.clienteMercaderiaRepository.delete({
      cliente: { ClienteID: clienteID },
    });
  }
}
