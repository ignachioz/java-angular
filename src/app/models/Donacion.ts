export class Donacion{
    constructor(
        public id: Number,
        public cantidad: Number,
        public fecha: Date,
        public medioDePago: Object,
        public mensaje: String,
        public nombre: String,
        public precioManguito: Number
    ){}
}