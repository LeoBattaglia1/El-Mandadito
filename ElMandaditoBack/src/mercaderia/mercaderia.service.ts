import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MercaderiaDto } from './dto/mercaderia.dto';
import { Mercaderia } from './entities/mercaderia.entity';

@Injectable()
export class MercaderiaService {
  constructor(
    @InjectRepository(Mercaderia)
    private readonly mercaderiaRepository: Repository<Mercaderia>,
  ) {}

  async create(mercaderiaDto: MercaderiaDto): Promise<MercaderiaDto> {
    // Verificar si ya existe una mercadería con el mismo código
    const existingMercaderia = await this.mercaderiaRepository.findOne({
      where: { codigo: mercaderiaDto.codigo },
    });

    if (existingMercaderia) {
      // Si existe una mercadería con el mismo código, lanzar un error
      throw new ConflictException(
        `Ya existe una mercadería con el código ${mercaderiaDto.codigo}`,
      );
    }

    // Si no existe, crear y guardar la nueva mercadería
    const mercaderia = this.mercaderiaRepository.create(mercaderiaDto);
    await this.mercaderiaRepository.save(mercaderia);

    return mercaderia;
  }

  async findAll(): Promise<MercaderiaDto[]> {
    return this.mercaderiaRepository.find();
  }

  async findOne(id: string): Promise<MercaderiaDto> {
    const mercaderia = await this.mercaderiaRepository.findOne({
      where: { codigo: id },
    });

    if (!mercaderia) {
      throw new NotFoundException(`mercaderia con ID ${id} no encontrado`);
    }

    return mercaderia as MercaderiaDto;
  }

  async findOneByCodigo(codigo: string) {
    return this.mercaderiaRepository.findOne({ where: { codigo } });
  }

  async update(
    id: string,
    mercaderiaDto: MercaderiaDto,
  ): Promise<MercaderiaDto> {
    const mercaderia = await this.mercaderiaRepository.findOne({
      where: { codigo: id },
    });

    if (!mercaderia) {
      throw new NotFoundException(`mercaderia con ID ${id} no encontrado`);
    }

    await this.mercaderiaRepository.update(id, mercaderiaDto);

    // Cargar el mercaderia actualizado para devolverlo
    const mercaderiaActualizado = await this.mercaderiaRepository.findOne({
      where: { codigo: id },
    });

    if (!mercaderiaActualizado) {
      throw new NotFoundException(
        `mercaderia con ID ${id} no encontrado después de la actualización`,
      );
    }

    return mercaderiaActualizado as MercaderiaDto;
  }

  async remove(id: string): Promise<boolean> {
    const mercaderia = await this.mercaderiaRepository.findOne({
      where: { codigo: id },
    });

    if (!mercaderia) {
      throw new NotFoundException(`mercaderia con ID ${id} no encontrado`);
    }

    await this.mercaderiaRepository.remove(mercaderia);
    return true;
  }
}
