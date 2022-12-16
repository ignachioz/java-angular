import { Injectable } from '@angular/core';
import { EmprendimientoResp, TokenDecode } from '../interfaces/responseType';
import jwt_decode from 'jwt-decode';
import { EmprendimientoService } from './emprendimiento.service';
import { RedSocial } from '../models/RedSocial';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logeado: boolean = false;

  constructor() { }

  loguearse(data:string){
    this.logeado = true;
    localStorage.setItem("token",  data);
    localStorage.setItem("logeado", JSON.stringify(true));
  }

  desloguearse(){
    localStorage.removeItem("token");
    localStorage.setItem("logeado",JSON.stringify(false));
    localStorage.removeItem("emprendimiento");
  }

  getLogueado(){
    return this.logeado;
  }
 
  setEmprendimiento(emprendimiento:EmprendimientoResp){
    localStorage.setItem("emprendimiento", JSON.stringify(emprendimiento));
  }

  getEmprendimiento():EmprendimientoResp{
    let emprendimiento:any=''
    return emprendimiento;
  }

  getTokenDecode():TokenDecode{
    let token = localStorage.getItem("token") || '';
    let decode:any = '';
    if(token !== ''){
      decode = jwt_decode(token);
    }
    return decode;
  }

}
