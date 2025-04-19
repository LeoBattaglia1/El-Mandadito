import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesDto } from './dto/clientes.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() clientesDto: ClientesDto) {
    return await this.clientesService.create(clientesDto);
  }
  @Get()
  async findAll(): Promise<ClientesDto[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClientesDto> {
    return await this.clientesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() clientesDto: ClientesDto,
  ): Promise<ClientesDto> {
    return await this.clientesService.update(+id, clientesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.clientesService.remove(+id);
  }
}
