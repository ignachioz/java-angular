import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BodyPagosCategorias } from '../components/pagos/pagos.component';
import { donacion, donacionRealizada, EmprendimientoResp, FormDonacion, SuspensionEmprendimiento } from '../interfaces/responseType';
import { Donacion } from '../models/Donacion';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token': ""+localStorage.getItem("token"),
  }),
};

const urlAPI = 'http://localhost:8080/manguito/api/emprendimiento/';



@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService {
  headers: HttpHeaders;
  constructor(private http: HttpClient)  {}
  
  obtenerDatosDelEmprendimiento(idEmprendimiento:string, externo:string="false"){
    return this.http.get<EmprendimientoResp>(urlAPI+idEmprendimiento+"?externo="+externo,httpOptions);
  }

  obtenerDonaciones(idEmprendimiento:string){
    return this.http.get<Donacion[]>(urlAPI+"listar-donaciones/"+idEmprendimiento,httpOptions);
  }

  realizarDonacion(idEmprendimiento:string, body:FormDonacion){
    return this.http.post<donacionRealizada>(urlAPI+"donar/"+idEmprendimiento,body,httpOptions);
  } 

  actualizarBanner(body:FormData,idEmprendimiento:string){
    return this.http.post(urlAPI+"actualizar-banner/"+idEmprendimiento,body)
  }

  actualizarEmprendimiento(body:EmprendimientoResp){
    return this.http.put<EmprendimientoResp>(urlAPI,body,{
      headers: {
        'Content-Type': 'application/json',
        'token': ""+localStorage.getItem("token")
      }
    });
  }

  actualizarCategoriasPagos(body:BodyPagosCategorias){
    return this.http.put<EmprendimientoResp>(urlAPI+"categorias-pagos",body,{
      headers: {
        'Content-Type': 'application/json',
        'token': ""+localStorage.getItem("token")
      }
    });
  }

  obtenerTodosLosEmprendimientos(){
    return this.http.get<Array<EmprendimientoResp>>(urlAPI+"obtener-emprendimientos");
  }

  suspenderEmprendimiento(idEmprendimiento:string,body:string){
    return this.http.put<SuspensionEmprendimiento>(urlAPI+"suspender-emprendimiento/"+idEmprendimiento,{
      mensajeSuspension:body
    },httpOptions);
  }

  


}
