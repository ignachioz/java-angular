import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriasMediosDePagos } from '../interfaces/CategoriasMediosDePagos';
import { Categoria } from '../models/Categoria';
import { MedioDePago } from '../models/MedioDePago';
import { TipoRedSocial } from '../models/TipoRedSocial';



const urlAPI = 'http://localhost:8080/manguito/api/configuracion/';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(private http: HttpClient) {}


  obtenerCategorias(){
    return this.http.get<Categoria[]>(urlAPI+"categorias");
  }

  obtenerMediosDePagos(){
    return this.http.get<MedioDePago[]>(urlAPI+"medios-de-pagos")
  }

  obtenerTipoRedes(){
    return this.http.get<TipoRedSocial[]>(urlAPI+"redes");
  }

  eliminarCategoria(id:number){
    return this.http.delete(urlAPI+"eliminar-categoria/"+id)
  }

  crearCategoria(nombre:string){
    return this.http.post(urlAPI+"crear-categoria",{nombre});
  }

  obtenerCategoria(id:string){
    return this.http.get<Categoria>(urlAPI+"obtener-categoria/"+id);
  }

  editarCategoria(body:Categoria){
    return this.http.put(urlAPI+"editar-categoria",body)
  }


}
