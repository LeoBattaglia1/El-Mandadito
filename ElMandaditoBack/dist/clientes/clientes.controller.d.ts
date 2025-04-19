import { ClientesService } from './clientes.service';
import { ClientesDto } from './dto/clientes.dto';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(clientesDto: ClientesDto): Promise<ClientesDto>;
    findAll(): Promise<ClientesDto[]>;
    findOne(id: string): Promise<ClientesDto>;
    update(id: string, clientesDto: ClientesDto): Promise<ClientesDto>;
    remove(id: string): Promise<boolean>;
}
