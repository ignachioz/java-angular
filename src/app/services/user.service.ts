import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaLogin, UsuarioLogin } from '../interfaces/responseType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token': ""+localStorage.getItem('token')
  }),
};

const urlAPI = 'http://localhost:8080/manguito/api/usuarios/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}


  obtenerUsuarioLogin(body: UsuarioLogin){
    return this.http.post<RespuestaLogin>(urlAPI + "login", body, httpOptions);
  }

  registrarUsuarioEmprendimiento(body:Object){
    return this.http.post<RespuestaLogin>(urlAPI,body);
  }
}
