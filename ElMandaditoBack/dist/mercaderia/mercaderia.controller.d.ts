import { MercaderiaService } from './mercaderia.service';
import { MercaderiaDto } from './dto/mercaderia.dto';
export declare class MercaderiaController {
    private readonly mercaderiaService;
    constructor(mercaderiaService: MercaderiaService);
    create(mercaderiaDto: MercaderiaDto): Promise<MercaderiaDto>;
    findAll(): Promise<MercaderiaDto[]>;
    findOne(id: string): Promise<MercaderiaDto>;
    getMercaderiaByCodigo(codigo: string): Promise<import("./entities/mercaderia.entity").Mercaderia | null>;
    update(id: string, mercaderiaDto: MercaderiaDto): Promise<MercaderiaDto>;
    remove(id: string): Promise<boolean>;
}
