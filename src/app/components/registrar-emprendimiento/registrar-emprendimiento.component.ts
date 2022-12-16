import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { MedioDePago } from 'src/app/models/MedioDePago';
import { UsuarioEmprendimiento } from 'src/app/models/UsuarioEmprendimiento';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from "jwt-decode";
import { Feedback } from 'src/app/interfaces/responseType';
import { LoginService } from 'src/app/services/login.service';

export interface emprendimientoForm{
  email: string,
  dni: string,
  password: string,
  repetirContrasenia: string,
  fechaNac: Date,
  nombre: string,
  descripcion: string,
  categorias: number[],
  mediosDePagos: number[]
  precioManguito: number
}

@Component({
  selector: 'app-registrar-emprendimiento',
  templateUrl: './registrar-emprendimiento.component.html',
  styleUrls: ['./registrar-emprendimiento.component.css']
})
export class RegistrarEmprendimientoComponent implements OnInit {
  categorias: Array<Categoria> = [];
  mediosDePagos: Array<MedioDePago> = [];
  //archivo: File;
  emprendimiento:emprendimientoForm={
    email: "",
    dni: "",
    password: "",
    repetirContrasenia: "",
    fechaNac: new Date(),
    nombre: "",
    descripcion: "",
    categorias: [],
    precioManguito: 0,
    mediosDePagos: []
  }

  feedback: Feedback = {
    class: "",
    mensaje: ""
  }

  constructor(private userService:UserService, 
    private emprendimientoService:EmprendimientoService,
    private configuracionService:ConfiguracionService,
    private router:Router,
    private loginService:LoginService
  ){
    
  }

  ngOnInit(): void {
    this.configuracionService.obtenerCategorias()
    .subscribe(d => this.categorias = d);
    this.configuracionService.obtenerMediosDePagos()
    .subscribe(d => this.mediosDePagos = d);
  }

  registrarse(){
    if(this.emprendimiento.nombre == "" || this.emprendimiento.dni == "" || this.emprendimiento.password == "" || this.emprendimiento.precioManguito <= 0 || this.emprendimiento.categorias.length == 0 || this.emprendimiento.mediosDePagos.length == 0){
      this.feedback = {
        class: "alert-danger",
        mensaje: "No pueden haber cambios vacios"
      }
      return;
    }
    if(this.emprendimiento.password !== this.emprendimiento.repetirContrasenia){
      this.feedback = {
        class: "alert-danger",
        mensaje: "Las contraseñas no coinciden"
      }
      return;
    }
    this.userService.registrarUsuarioEmprendimiento(this.emprendimiento)
    .subscribe({
      next: (data) =>{
        this.loginService.loguearse(data.msg);
        let decodeToken = this.loginService.getTokenDecode();
        if(decodeToken){
          this.router.navigate([`/emprendimiento/${decodeToken.idEmprendimiento}`])
        }
      },
      error: (e) => {
        this.feedback.class = "alert-danger";
        this.feedback.mensaje = e.error.msg;
      }
    }); 
  }
/* 
  capturarFile(event:any){
    this.archivo = event.target.files[0];
  } */


}
