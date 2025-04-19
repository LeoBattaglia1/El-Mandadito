import { Repository } from 'typeorm';
import { MercaderiaDto } from './dto/mercaderia.dto';
import { Mercaderia } from './entities/mercaderia.entity';
export declare class MercaderiaService {
    private readonly mercaderiaRepository;
    constructor(mercaderiaRepository: Repository<Mercaderia>);
    create(mercaderiaDto: MercaderiaDto): Promise<MercaderiaDto>;
    findAll(): Promise<MercaderiaDto[]>;
    findOne(id: string): Promise<MercaderiaDto>;
    findOneByCodigo(codigo: string): Promise<Mercaderia | null>;
    update(id: string, mercaderiaDto: MercaderiaDto): Promise<MercaderiaDto>;
    remove(id: string): Promise<boolean>;
}
