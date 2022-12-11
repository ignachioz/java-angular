import { MedioDePago } from "./MedioDePago";

export class Emprendimiento{

    constructor(
        public nombre: String,
        public categorias: Array<Object>,
        public banner: String,
        public descripcion: String,
        public topDonadores: Boolean,
        public manguitosRecibidos: Boolean,
        public precioManguito: Number,
        public isActivo: Boolean,
        public mensajeSuspension: String,
        public cantidadVisitas: Number,
        public cantidadManguitosRecibidos: Number,
        public pagosAceptados:Array<MedioDePago>,
        public id: Number
    ){}
    

}