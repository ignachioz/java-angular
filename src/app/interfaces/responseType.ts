import { Categoria } from "../models/Categoria";
import { MedioDePago } from "../models/MedioDePago";
import { RedSocial } from "../models/RedSocial";
import { Usuario } from "../models/Usuario";

export interface RespuestaLogin {
    msg: string;
    status: string;
    esAdmin: boolean;
}



export interface emprendimientoResp {
    nombre: String;
    categorias: Array<Categoria>;
    banner: string;
    descripcion: String;
    topDonadores?: Boolean;
    mangitosRecibidos?: Boolean;
    precioManguito: Number;
    isActivo?: Boolean;
    mensajeSuspension?: String;
    cantidadVisitas?: Number;
    cantidadManguitosRecibidos?: Number;
    id?: Number;
    duenio: Usuario;
    pagosAceptados: Array<MedioDePago>;
    redes: Array<RedSocial>;
}

export interface donacion{
    id: Number,
    cantidad: Number,
    fecha: Date,
    medioDePago: Object,
    mensaje: String,
    nombre: String,
    precioManguito: Number
}
  

export interface donacionRealizada{
    msg:String,
    status: String
}