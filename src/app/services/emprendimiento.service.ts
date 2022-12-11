import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formDonacion } from '../components/donacion/donacion.component';
import { BodyPagosCategorias } from '../components/pagos/pagos.component';
import { donacion, donacionRealizada, emprendimientoResp } from '../interfaces/responseType';



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

  constructor(private http: HttpClient) {}
  
  obtenerDatosDelEmprendimiento(idEmprendimiento:String){
    return this.http.get<emprendimientoResp>(urlAPI+idEmprendimiento,httpOptions);
  }

  obtenerDonaciones(idEmprendimiento:String){
    return this.http.get<donacion[]>(urlAPI+"listar-donaciones/"+idEmprendimiento,httpOptions);
  }

  realizarDonacion(idEmprendimiento:String, body:formDonacion){
    return this.http.post<donacionRealizada>(urlAPI+"donar/"+idEmprendimiento,body,httpOptions);
  }

  actualizarBanner(body:FormData,idEmprendimiento:String){
    return this.http.post(urlAPI+"actualizar-banner/"+idEmprendimiento,body)
  }

  actualizarEmprendimiento(body:emprendimientoResp){
    return this.http.put<emprendimientoResp>(urlAPI,body,httpOptions);
  }

  actualizarCategoriasPagos(body:BodyPagosCategorias){
    return this.http.put<emprendimientoResp>(urlAPI+"categorias-pagos",body,httpOptions);
  }


  


}
