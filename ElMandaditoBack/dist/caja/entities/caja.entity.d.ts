export declare class Caja {
    id: number;
    fecha: Date;
    efectivo: number;
    cuenta_dni: number;
    fiado: number;
    constructor(fecha: Date, efectivo?: number, cuenta_dni?: number, fiado?: number);
    getId(): number;
    getFecha(): Date;
    getEfectivo(): number;
    getCuentaDni(): number;
    getFiado(): number;
    setId(id: number): void;
    setFecha(fecha: Date): void;
    setEfectivo(valor: number): void;
    setCuentaDni(valor: number): void;
    setFiado(valor: number): void;
}
