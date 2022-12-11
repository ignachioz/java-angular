import { Injectable } from '@angular/core';
import { emprendimientoResp } from '../interfaces/responseType';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logeado: boolean = false;
  public emprendimiento:emprendimientoResp;

  constructor() { }

  loguearse(data:string){
    this.logeado = true;
    localStorage.setItem("token", data);
    localStorage.setItem("logeado", JSON.stringify(true));
  }

  desloguearse(){
    localStorage.removeItem("token");
    localStorage.setItem("logeado",JSON.stringify(false));
  }

  getLogueado(){
    return this.logeado;
  }

  setEmprendimiento(emprendimiento:emprendimientoResp){
    this.emprendimiento = emprendimiento;
  }

  getEmprendimiento(){
    return this.emprendimiento;
  }
}
