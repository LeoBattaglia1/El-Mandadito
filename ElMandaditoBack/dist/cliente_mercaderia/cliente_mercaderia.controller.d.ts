import { ClienteMercaderiaService } from './cliente_mercaderia.service';
import { ClienteMercaderia } from './entities/cliente_mercaderia.entity';
export declare class ClienteMercaderiaController {
    private readonly clienteMercaderiaService;
    constructor(clienteMercaderiaService: ClienteMercaderiaService);
    create(clienteID: number, codigo: string, fecha: Date): Promise<ClienteMercaderia>;
    findAll(): Promise<ClienteMercaderia[]>;
    getMercaderiasPorClienteID(clienteID: number): Promise<{
        Nombre: string;
        precio: number;
    }[]>;
    getIdsClienteMercaderia(clienteID: number): Promise<number[]>;
    getIdsClienteMercaderiaPorClienteIDyCodigo(clienteID: number, codigo: string): Promise<number[]>;
    remove(id: string): Promise<boolean>;
    eliminarTodosPorCliente(clienteID: number): Promise<{
        message: string;
    }>;
    removeByClienteIDAndCodigo(clienteID: number, codigo: string): Promise<void>;
    contarPorCliente(clienteID: number): Promise<{
        count: number;
    }>;
}
