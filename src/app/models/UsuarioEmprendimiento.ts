import { Emprendimiento } from "./Emprendimiento";
import { Usuario } from "./Usuario";

export class UsuarioEmprendimiento {
    constructor(
        public duenio:string,
        public miEmprendimiento: Emprendimiento
    ){}
}