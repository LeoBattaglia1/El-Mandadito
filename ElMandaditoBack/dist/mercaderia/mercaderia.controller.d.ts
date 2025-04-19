import { MercaderiaService } from './mercaderia.service';
import { MercaderiaDto } from './dto/mercaderia.dto';
export declare class MercaderiaController {
    private readonly mercaderiaService;
    constructor(mercaderiaService: MercaderiaService);
    create(mercaderiaDto: MercaderiaDto): Promise<MercaderiaDto>;
    findAll(): Promise<MercaderiaDto[]>;
    getMercaderiaByCodigo(codigo: string): Promise<import("./entities/mercaderia.entity").Mercaderia>;
    update(id: string, mercaderiaDto: MercaderiaDto): Promise<MercaderiaDto>;
    remove(id: string): Promise<boolean>;
}
