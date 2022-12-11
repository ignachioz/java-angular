import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RespuestaLogin } from '../interfaces/responseType';
import { UsuarioEmprendimiento } from '../models/UsuarioEmprendimiento';

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

  queryPOST(url: String, body: Object): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(urlAPI + url, body, httpOptions);
  }

  registrarUsuarioEmprendimiento(body:Object){
    return this.http.post<RespuestaLogin>(urlAPI,body);
  }
}
