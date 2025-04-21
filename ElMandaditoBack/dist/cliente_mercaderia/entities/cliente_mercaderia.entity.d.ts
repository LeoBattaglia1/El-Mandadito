import { Clientes } from '../../clientes/entities/clientes.entity';
import { Mercaderia } from '../../mercaderia/entities/mercaderia.entity';
export declare class ClienteMercaderia {
    id: number;
    cliente: Clientes;
    mercaderia: Mercaderia;
    cantidad: number;
    fecha: Date;
    constructor(cliente: Clientes, mercaderia: Mercaderia, cantidad: number, fecha: Date);
}
