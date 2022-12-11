import { Categoria } from "../models/Categoria";
import { MedioDePago } from "../models/MedioDePago";

export interface CategoriasMediosDePagos{
    mediosDePagos: Array<MedioDePago>,
    categorias: Array<Categoria>
}