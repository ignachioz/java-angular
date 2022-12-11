import { Component, OnInit } from '@angular/core';
import { emprendimientoResp } from 'src/app/interfaces/responseType';
import { Categoria } from 'src/app/models/Categoria';
import { MedioDePago } from 'src/app/models/MedioDePago';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';
import jwt_decode from 'jwt-decode';

export interface BodyPagosCategorias{
  pagos: Array<number>,
  categorias: Array<number>
}

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit{


  categorias: Array<Categoria> = [];
  mediosDePagos: Array<MedioDePago> = [];

  categoriasEmprendimiento: BodyPagosCategorias = {
    pagos: [],
    categorias: []
  }

  feedback = {
    mensaje: '',
    class: ''
  }

  cargando = true;

  //hacerlo en el padre y pasarselo a los hijos.
  emprendimiento:emprendimientoResp={
    duenio:{
      email: "",
      fechaNac: "",
      id: 0,
      dni: 0
    },
    nombre: "",
    descripcion: "",
    categorias: [],
    precioManguito: 0,
    pagosAceptados: [],
    banner: "asdasd",
    topDonadores: false,
    cantidadManguitosRecibidos: 0,
    mangitosRecibidos: false,
    redes: []
  }


  constructor(
    private configuracionService:ConfiguracionService,
    private emprendimientoService:EmprendimientoService
  ){}

  ngOnInit(){
    let token = localStorage.getItem("token") || "";
    let decodeToken:any = jwt_decode(token);
    this.emprendimientoService.obtenerDatosDelEmprendimiento(decodeToken.idEmprendimiento)
    .subscribe(d=> {
      this.emprendimiento=d
      this.categoriasEmprendimiento.categorias = d.categorias.map(c => c.id)
      this.categoriasEmprendimiento.pagos = d.pagosAceptados.map(p => p.id);
    })
    this.configuracionService.obtenerCategorias()
    .subscribe(d => {
      this.categorias = d;
    })
    this.configuracionService.obtenerMediosDePagos()
    .subscribe(d => {
      this.mediosDePagos = d;
      this.cargando = false;
    })
  }


  actualizar(){
    this.emprendimientoService.actualizarCategoriasPagos(this.categoriasEmprendimiento)
    .subscribe({
      next: (d) => {

        this.feedback.mensaje = "Actualización realizada con exito";
        this.feedback.class = "alert-success"
      },
      error: (e) => {
        this.feedback.mensaje = "Problemas al realizar la actualización";
        this.feedback.class = "alert-danger"
      }
    })
  }

  nuevaCategoria(id:number){
    if(!this.categoriasEmprendimiento.categorias.some(num => num == id)){
      this.categoriasEmprendimiento.categorias.push(id);
    }else{
      this.categoriasEmprendimiento.categorias = this.categoriasEmprendimiento.categorias.filter(num => num !== id);
    }
  }

  nuevoMetodoDePago(id:number){
    if(!this.categoriasEmprendimiento.pagos.some(num => num == id)){
      this.categoriasEmprendimiento.pagos.push(id);
    }else{
      this.categoriasEmprendimiento.pagos = this.categoriasEmprendimiento.pagos.filter(num => num !== id);
    }
  }

}
