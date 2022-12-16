import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { fromEvent, map, Observable } from 'rxjs';
import { EmprendimientoResp } from 'src/app/interfaces/responseType';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  emprendimiento: EmprendimientoResp;
  existe: boolean = false;
  cargando:boolean = true;
  esMiEmprendimiento:boolean = false ;
  soyAdmin:boolean = false;
  constructor(
    private emprendimientoService: EmprendimientoService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    private route:Router
  ) {
    this.router.params.subscribe((params) => {
      let decodeToken = this.loginService.getTokenDecode();
      if(decodeToken){
        this.soyAdmin = decodeToken.esAdmin;
        this.esMiEmprendimiento = decodeToken.idEmprendimiento == params["id"]; 
      }
    });
  }

  
 

  ngOnInit() {
    let id: string = '';
    this.router.params.subscribe((params) => {
      id = params['id'];
    });
    let externo = "false";
    if(!this.esMiEmprendimiento){
      externo = "true";
    }
    this.emprendimientoService.obtenerDatosDelEmprendimiento(id,externo).subscribe({
      next: (data) => {
        console.log(data);
        if(data.mensajeSuspension !== "" && !this.esMiEmprendimiento){
          this.existe = false;
          this.cargando = false;
          return;
        }
        this.loginService.setEmprendimiento(data);
        this.existe = true;
        this.emprendimiento = data; 
        if(!this.emprendimiento.banner){
          this.emprendimiento.banner = 'assets/default.png';
        }else{
          this.emprendimiento.banner = `data:image/jpg;base64,${data.banner}`;
        }
        this.cargando = false;
      },
      error: (e) => {
        this.existe = false;
        this.cargando = false;
      },
    });
  }

}
