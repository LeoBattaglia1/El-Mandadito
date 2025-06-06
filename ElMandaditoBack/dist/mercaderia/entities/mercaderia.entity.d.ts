import { ClienteMercaderia } from '../../cliente_mercaderia/entities/cliente_mercaderia.entity';
export declare class Mercaderia {
    codigo: string;
    stock: number;
    Nombre: string;
    Precio: number;
    clienteMercaderias: ClienteMercaderia[];
    constructor(codigo: string, stock: number, Nombre: string, Precio: number);
    getCodigo(): string;
    getNombre(): string;
    getPrecio(): number;
    setNombre(Nombre: string): void;
    setPrecio(Precio: number): void;
}
