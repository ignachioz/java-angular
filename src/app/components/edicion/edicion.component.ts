import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {
  emprendimiento:any = {};
  clickEnElemento:string = "perfil";
  constructor(){

  }

  ngOnInit(): void {
  }

  elementoClickeado(valor:string){
    this.clickEnElemento = valor;
  }

}
