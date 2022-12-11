import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges{

  logeado = false;

  opciones:Array<{titulo:string,
    url:string}> = [
    {
      titulo: "Explorar",
      url: "/explorar"
    },
    {
      titulo: "Registrarse",
      url: "/registrar-emprendimiento"
    },
    {
      titulo: "Ingresar",
      url: "/login"
    }
  ]

  constructor(private router: Router,private loginService:LoginService) {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.seleccionarRutas();
      }
    });
  }
  ngOnInit(): void {
  }

  ngOnChanges(){
  }

  seleccionarRutas(){
    let logeado = localStorage.getItem('logeado');
    if(logeado == "true"){
      this.logeado = true;
      let token = localStorage.getItem("token") || "";
      let decodeToken:any = {};
      if(token !== ''){
        decodeToken = jwt_decode(token);  //armar interface de token
      }
      if(decodeToken.esAdmin){
        this.opciones = [
          {
            titulo: "Explorar",
            url: "/explorar"
          },
          {
            titulo: "Inicio",
            url: "/admin"
          }
        ]
      }else{
        this.opciones = [
          {
            titulo: "Inicio",
            url: "/emprendimiento/"+decodeToken.idEmprendimiento
          },
          {
            titulo: "Explorar",
            url: "/explorar"
          },
          {
            titulo: "Editar perfil",
            url: "/perfil"
          }
        ]
      }
    }else{
      this.logeado = false;
      this.opciones = [
        {
          titulo: "Explorar",
          url: "/explorar"
        },
        {
          titulo: "Registrarse",
          url: "/registrar-emprendimiento"
        },
        {
          titulo: "Ingresar",
          url: "/login"
        }
      ]
    }
  }

  cerrarSesion(){
    this.loginService.desloguearse();
    this.logeado = false;
  }
}
