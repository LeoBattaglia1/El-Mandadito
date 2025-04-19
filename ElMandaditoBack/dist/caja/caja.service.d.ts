import { Repository } from 'typeorm';
import { CajaDto } from './dto/caja.dto';
import { Caja } from './entities/caja.entity';
export declare class CajaService {
    private readonly cajaRepository;
    constructor(cajaRepository: Repository<Caja>);
    create(cajaDto: CajaDto): Promise<CajaDto>;
    actualizarEfectivo(fecha: Date, monto: number): Promise<any>;
    actualizarFiado(fecha: Date, monto: number): Promise<any>;
    actualizarCuentaDni(fecha: Date, monto: number): Promise<any>;
    findAll(): Promise<CajaDto[]>;
    findByFecha(fecha: string): Promise<boolean>;
    findOne(id: number): Promise<CajaDto>;
    remove(id: number): Promise<boolean>;
}
