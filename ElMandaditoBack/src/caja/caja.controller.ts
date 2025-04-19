import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CajaService } from './caja.service';
import { CajaDto } from './dto/caja.dto';

@Controller('caja')
export class CajaController {
  cajaRepository: any;
  constructor(private readonly cajaService: CajaService) {}

  @Post()
  async create(@Body() cajaDto: CajaDto): Promise<CajaDto> {
    return await this.cajaService.create(cajaDto);
  }

  @Get()
  async findAll(): Promise<CajaDto[]> {
    return this.cajaService.findAll();
  }

  // Ruta para buscar por ID
  @Get('id/:id')
  async getById(@Param('id') id: number): Promise<CajaDto> {
    return this.cajaService.findOne(id);
  }

  // Ruta para buscar por fecha
  @Get('fecha/:fecha')
  async getByFecha(@Param('fecha') fecha: string): Promise<boolean> {
    return this.cajaService.findByFecha(fecha);
  }

  // caja.controller.ts
  @Put('actualizar/efectivo/:fecha')
  async actualizarEfectivo(
    @Param('fecha') fecha: string,
    @Body() body: { monto: number },
  ): Promise<any> {
    return this.cajaService.actualizarEfectivo(new Date(fecha), body.monto);
  }

  @Put('actualizar/fiado/:fecha')
  async actualizarFiado(
    @Param('fecha') fecha: string,
    @Body() body: { monto: number },
  ): Promise<any> {
    return this.cajaService.actualizarFiado(new Date(fecha), body.monto);
  }

  @Put('actualizar/cuentaDni/:fecha')
  async actualizarCuentaDni(
    @Param('fecha') fecha: string,
    @Body() body: { monto: number },
  ): Promise<any> {
    return this.cajaService.actualizarCuentaDni(new Date(fecha), body.monto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.cajaService.remove(+id);
  }
}
