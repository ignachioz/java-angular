import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from "jwt-decode";
import { LoginService } from 'src/app/services/login.service';
import { Feedback, TokenDecode } from 'src/app/interfaces/responseType';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:string = "";
  password:string = "";

  feedback: Feedback = {
    mensaje: '',
    class: ''
  }

  constructor(
    private userService:UserService,
    private router:Router,
    private loginService:LoginService
  ){}

  ngOnInit(){}

  login(){
    if(this.email == '' || this.password == ''){
      this.feedback = {
        mensaje: 'No puede haber campos vacios',
        class: 'alert-danger'
      }
      return ;
    }
    this.userService.obtenerUsuarioLogin({
      email: this.email,
      password: this.password
    })
    .subscribe({
      next:(data) => {
        if(data.status == "OK"){
          this.loginService.loguearse(data.msg);
          let decodeToken:TokenDecode = this.loginService.getTokenDecode();
          if(decodeToken.esAdmin){
            this.router.navigate(["/admin"]);
            return;
          }
          this.router.navigate(["/emprendimiento/"+decodeToken.idEmprendimiento]);
        }
      },
      error: (err) => {
        if(err.status == 404){
          this.feedback = {
            mensaje: err.error.msg,
            class: 'alert-danger'
          }
        }else{
          this.feedback = {
            mensaje: "Problemas internos del servidor intentelo más tarde",
            class: 'alert-danger'
          }
        }
      }
    })
  }

}
