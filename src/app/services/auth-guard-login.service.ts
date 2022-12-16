import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate{

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
}
  canActivate() {
    if (localStorage.getItem("logeado") == "true") {
        let decodeToken = this.loginService.getTokenDecode();
        if(decodeToken){
          if(decodeToken.esAdmin){
              this.router.navigate(['/admin']);
          }else{
              this.router.navigate(['/emprendimiento/'+decodeToken.idEmprendimiento]);
          }
        }
      return false;
    }
    return true;
  }

}
