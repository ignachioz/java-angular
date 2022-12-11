import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { emprendimientoResp } from 'src/app/interfaces/responseType';
import { Categoria } from 'src/app/models/Categoria';
import { MedioDePago } from 'src/app/models/MedioDePago';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from "jwt-decode";
import { TipoRedSocial } from 'src/app/models/TipoRedSocial';
import { RedSocial } from 'src/app/models/RedSocial';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  feedback = {
    mensaje: '',
    class: ''
  }

  file:any;
  mensajeMangitosRecibidos:String="";
  mensajeTopDonadores:String="";
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

  cargando = true;


  redes: Array<TipoRedSocial> = [];

  constructor(
    private userService:UserService, 
    private emprendimientoService:EmprendimientoService,
    private configuracionService:ConfiguracionService,
    private router:Router
  ){}

  ngOnInit(): void {
    let token = localStorage.getItem("token") || ""; //pasar a función
    let decodeToken:any = jwt_decode(token);
    this.emprendimientoService.obtenerDatosDelEmprendimiento(decodeToken.idEmprendimiento) 
    .subscribe(d => {
      console.log(d);
      this.emprendimiento = d;
      this.emprendimiento.duenio.fechaNac =  new Date(this.emprendimiento.duenio.fechaNac).toISOString().split("T")[0];

      this.configuracionService.obtenerTipoRedes()
      .subscribe(d => {
        this.redes = d;
        let redesFinal:Array<RedSocial>=[];
        this.redes.forEach(r => {
          if(!this.emprendimiento.redes.some(redEmp => redEmp.tipoRedSocial.id == r.id)){
            redesFinal.push(new RedSocial("",r,0));
          }
        })
        this.emprendimiento.redes.push(...redesFinal);
        this.cargando = false
      })
    });
  }

  actualizarEmprendimiento(){
    let token = localStorage.getItem("token") || ""; //pasar a función
    let decodeToken:any = jwt_decode(token);
    if(this.file){
      let formData = new FormData();
      formData.append("file", this.file);
      this.emprendimientoService.actualizarBanner(formData,decodeToken.idEmprendimiento)
      .subscribe(d => console.log(d));
    }
    this.emprendimientoService.actualizarEmprendimiento(this.emprendimiento)
    .subscribe({
      next: (d) => {
        this.feedback.mensaje = "El emprendimiento fue actualizado correctamente";
        this.feedback.class = "alert-success";
      },
      error: (e) => {
        console.log(e);
        this.feedback.mensaje = "Problemas al actualizar el emprendimiento"
        if(e.status != 500){
          this.feedback.mensaje = e.error.msg
        }
        this.feedback.class = "alert-danger";
      }
    });
  }
  
  capturarFile(event:any){
    this.file = event.target.files[0];
  }


}
