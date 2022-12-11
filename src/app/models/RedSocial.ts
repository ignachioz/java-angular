import { TipoRedSocial } from "./TipoRedSocial";

export class RedSocial{
    constructor(
        public descripcion:String,
        public tipoRedSocial: TipoRedSocial,
        public id:number
    ){}
}