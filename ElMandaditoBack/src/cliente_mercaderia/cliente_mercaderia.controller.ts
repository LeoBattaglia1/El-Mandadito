import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClienteMercaderiaService } from './cliente_mercaderia.service';

import { ClienteMercaderia } from './entities/cliente_mercaderia.entity'; // Asegúrate de tener la ruta correcta

@Controller('cliente_mercaderia')
export class ClienteMercaderiaController {
  constructor(
    private readonly clienteMercaderiaService: ClienteMercaderiaService,
  ) {}

  @Post()
  async create(
    @Body('ClienteID') clienteID: number,
    @Body('codigo') codigo: string,
    @Body('cantidad') cantidad: number,
    @Body('fecha') fecha: Date,
  ): Promise<ClienteMercaderia> {
    return this.clienteMercaderiaService.create(
      clienteID,
      codigo,
      cantidad,
      fecha,
    );
  }

  @Get()
  findAll() {
    return this.clienteMercaderiaService.findAll();
  }

  @Get('mercaderias/:ClienteID')
  async getMercaderiasPorClienteID(@Param('ClienteID') clienteID: number) {
    return this.clienteMercaderiaService.getMercaderiasPorClienteID(clienteID);
  }

  @Get(':clienteID/ids')
  async getIdsClienteMercaderia(
    @Param('clienteID') clienteID: number,
  ): Promise<number[]> {
    return this.clienteMercaderiaService.getIdsClienteMercaderiaPorClienteID(
      clienteID,
    );
  }

  // Nuevo endpoint para obtener los IDs por clienteID y codigo
  @Get(':clienteID/mercaderias/:codigo/ids')
  async getIdsClienteMercaderiaPorClienteIDyCodigo(
    @Param('clienteID') clienteID: number,
    @Param('codigo') codigo: string,
  ): Promise<number[]> {
    return this.clienteMercaderiaService.getIdsClienteMercaderiaPorClienteIDyCodigo(
      clienteID,
      codigo,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clienteMercaderiaService.remove(+id);
  }

  @Delete('eliminar/:clienteID')
  async eliminarTodosPorCliente(
    @Param('clienteID') clienteID: number,
  ): Promise<{ message: string }> {
    await this.clienteMercaderiaService.removeAllByClienteID(clienteID);
    return { message: 'Todos los registros del cliente fueron eliminados' };
  }

  @Delete(':clienteID/mercaderias/:codigo')
  async removeByClienteIDAndCodigo(
    @Param('clienteID') clienteID: number,
    @Param('codigo') codigo: string,
  ): Promise<void> {
    await this.clienteMercaderiaService.removeByClienteIDAndCodigo(
      clienteID,
      codigo,
    );
  }

  @Get('count/:clienteID')
  async contarPorCliente(@Param('clienteID') clienteID: number) {
    const count =
      await this.clienteMercaderiaService.contarRegistrosPorClienteID(
        clienteID,
      );
    return { count };
  }
}
