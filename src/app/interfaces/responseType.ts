import { Categoria } from "../models/Categoria";
import { Donacion } from "../models/Donacion";
import { MedioDePago } from "../models/MedioDePago";
import { RedSocial } from "../models/RedSocial";
import { Usuario } from "../models/Usuario";

export interface RespuestaLogin {
    msg: string;
    status: string;
    esAdmin: boolean;
}



export interface EmprendimientoResp {
    nombre: string;
    categorias: Array<Categoria>;
    banner: string;
    descripcion: string;
    topDonadores?: boolean;
    mangitosRecibidos?: boolean;
    precioManguito: number;
    isActivo?: boolean;
    mensajeSuspension?: string;
    cantidadVisitas?: number;
    cantidadManguitosRecibidos?: number;
    id?: number;
    duenio: Usuario;
    pagosAceptados: Array<MedioDePago>;
    redes: Array<RedSocial>;
}

export interface donacion{
    id: number,
    cantidad: number,
    fecha: Date,
    medioDePago: Object,
    mensaje: string,
    nombre: string,
    precioManguito: number
}
  

export interface donacionRealizada{
    msg: string,
    status: string
}

export interface SuspensionEmprendimiento{
    status:string,
    msg:string
}

export interface TokenDecode {
    email: string, 
    esAdmin: boolean,
    iat: number,
    idEmprendimiento: string,
    iss:string,
    sub: string
}

export interface Feedback {
    mensaje: string,
    class: string
}

export interface FormDonacion{
    nombre:string;
    contacto:string;
    mensaje:string;
    medioDePago:number;
    cantidad:number;
}

export interface UsuarioLogin{
    email: string;
    password: string;
}
