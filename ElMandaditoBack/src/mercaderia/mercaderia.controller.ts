// src/mercaderia/mercaderia.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MercaderiaService } from './mercaderia.service';
import { MercaderiaDto } from './dto/mercaderia.dto';

@Controller('mercaderia')
export class MercaderiaController {
  constructor(private readonly mercaderiaService: MercaderiaService) {}

  @Post()
  async create(@Body() mercaderiaDto: MercaderiaDto) {
    return this.mercaderiaService.create(mercaderiaDto);
  }

  @Get()
  async findAll(): Promise<MercaderiaDto[]> {
    return this.mercaderiaService.findAll();
  }

  @Get('codigo/:codigo')
  async getMercaderiaByCodigo(@Param('codigo') codigo: string) {
    console.log('📦 Código recibido en ruta:', codigo);
    return this.mercaderiaService.findOneByCodigo(codigo);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() mercaderiaDto: MercaderiaDto,
  ): Promise<MercaderiaDto> {
    return this.mercaderiaService.update(id, mercaderiaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.mercaderiaService.remove(id);
  }
}
