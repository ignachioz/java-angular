import { Categoria } from "./Categoria";
import { MedioDePago } from "./MedioDePago";

export class Emprendimiento{

    constructor(
        public nombre: string,
        public categorias: Array<Categoria>,
        public banner: string,
        public descripcion: string,
        public topDonadores: boolean,
        public manguitosRecibidos: boolean,
        public precioManguito: number,
        public isActivo: boolean,
        public mensajeSuspension: string,
        public cantidadVisitas: number,
        public cantidadManguitosRecibidos: number,
        public pagosAceptados:Array<MedioDePago>,
        public id: number
    ) {}
    

}