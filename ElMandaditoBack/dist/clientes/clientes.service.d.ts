import { Repository } from 'typeorm';
import { ClientesDto } from './dto/clientes.dto';
import { Clientes } from './entities/clientes.entity';
export declare class ClientesService {
    private readonly clientesRepository;
    constructor(clientesRepository: Repository<Clientes>);
    create(clientesDto: ClientesDto): Promise<ClientesDto>;
    findAll(): Promise<ClientesDto[]>;
    update(id: number, clientesDto: ClientesDto): Promise<ClientesDto>;
    findOne(id: number): Promise<ClientesDto>;
    remove(id: number): Promise<boolean>;
}
