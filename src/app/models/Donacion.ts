export class Donacion{
    constructor(
        public id: number,
        public cantidad: number,
        public fecha: string,
        public medioDePago: Object,
        public mensaje: string,
        public nombre: string,
        public precioManguito: number
    ){}
}