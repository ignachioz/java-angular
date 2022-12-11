import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from "jwt-decode";
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:String = "";
  password:String = "";

  constructor(
    private userService:UserService,
    private router:Router,
    private loginService:LoginService
  ){}

  ngOnInit(){}

  login(){
    this.userService.queryPOST("login",{
      email: this.email,
      password: this.password
    })
    .subscribe({
      next:(data) => {
        if(data.status == "OK"){
          this.loginService.loguearse(data.msg);
          let token = localStorage.getItem("token") || "";
          let decodeToken:any = jwt_decode(token);
          console.log(decodeToken);
          if(decodeToken.esAdmin){
            this.router.navigate(["/admin"]);
            return;
          }
          this.router.navigate(["/emprendimiento/"+decodeToken.idEmprendimiento]);
        }
      },
      error: (err) => {
        console.log(err.error.msg);
      }
    })
  }

}
