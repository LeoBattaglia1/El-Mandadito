import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientesDto } from './dto/clientes.dto';
import { Clientes } from './entities/clientes.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
  ) {}

  async create(clientesDto: ClientesDto): Promise<ClientesDto> {
    // Verificar si ya existe un cliente con el mismo nombre
    const existingCliente = await this.clientesRepository.findOne({
      where: { Nombre: clientesDto.Nombre },
    });

    if (existingCliente) {
      // Si ya existe un cliente con el mismo nombre, lanzar una excepción o manejar el error
      throw new Error(
        `Ya existe un cliente con el nombre ${clientesDto.Nombre}`,
      );
    }

    // Si no existe un cliente con el mismo nombre, proceder con la creación
    const cliente = this.clientesRepository.create(clientesDto);
    await this.clientesRepository.save(cliente);
    return cliente;
  }

  async findAll(): Promise<ClientesDto[]> {
    return this.clientesRepository.find();
  }

  async update(id: number, clientesDto: ClientesDto): Promise<ClientesDto> {
    const cliente = await this.clientesRepository.findOne({
      where: { ClienteID: id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    await this.clientesRepository.update(id, clientesDto);

    // Cargar el cliente actualizado para devolverlo
    const clienteActualizado = await this.clientesRepository.findOne({
      where: { ClienteID: id },
    });

    if (!clienteActualizado) {
      throw new NotFoundException(
        `Cliente con ID ${id} no encontrado después de la actualización`,
      );
    }

    return clienteActualizado as ClientesDto;
  }

  async findOne(id: number): Promise<ClientesDto> {
    const cliente = await this.clientesRepository.findOne({
      where: { ClienteID: id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente as ClientesDto;
  }

  async remove(id: number): Promise<boolean> {
    const cliente = await this.clientesRepository.findOne({
      where: { ClienteID: id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    await this.clientesRepository.remove(cliente);
    return true;
  }
}
