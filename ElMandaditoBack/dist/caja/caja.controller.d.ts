import { CajaService } from './caja.service';
import { CajaDto } from './dto/caja.dto';
export declare class CajaController {
    private readonly cajaService;
    cajaRepository: any;
    constructor(cajaService: CajaService);
    create(cajaDto: CajaDto): Promise<CajaDto>;
    findAll(): Promise<CajaDto[]>;
    getById(id: number): Promise<CajaDto>;
    getByFecha(fecha: string): Promise<boolean>;
    actualizarEfectivo(fecha: string, body: {
        monto: number;
    }): Promise<any>;
    actualizarFiado(fecha: string, body: {
        monto: number;
    }): Promise<any>;
    actualizarCuentaDni(fecha: string, body: {
        monto: number;
    }): Promise<any>;
    remove(id: string): Promise<boolean>;
}
