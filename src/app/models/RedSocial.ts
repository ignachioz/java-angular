import { TipoRedSocial } from "./TipoRedSocial";

export class RedSocial{
    constructor(
        public descripcion:string,
        public tipoRedSocial: TipoRedSocial,
        public id:number
    ){}
}