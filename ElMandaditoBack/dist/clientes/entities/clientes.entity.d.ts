import { ClienteMercaderia } from '../../cliente_mercaderia/entities/cliente_mercaderia.entity';
export declare class Clientes {
    ClienteID: number;
    Nombre: string;
    Telefono: number;
    Direccion: string;
    clienteMercaderias: ClienteMercaderia[];
    constructor(nombre: string, telefono: number, direccion: string);
    getClientesId(): number;
    getNombre(): string;
    getTelefono(): number;
    getDireccion(): string;
    setNombre(nombre: string): void;
    setTelefono(telefono: number): void;
    setDireccion(direccion: string): void;
}
