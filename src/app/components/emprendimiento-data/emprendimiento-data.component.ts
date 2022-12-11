import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { donacion, emprendimientoResp } from 'src/app/interfaces/responseType';
import { Donacion } from 'src/app/models/Donacion';
import { Emprendimiento } from 'src/app/models/Emprendimiento';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-emprendimiento-data',
  templateUrl: './emprendimiento-data.component.html',
  styleUrls: ['./emprendimiento-data.component.css']
})
export class EmprendimientoDataComponent implements OnInit {

  
  @Input() emprendimiento: any;
  @Input('esMiEmprendimiento') esMiEmprendimiento:Boolean = false ;
  
  
  constructor(private route:ActivatedRoute, private router:Router){}
  
  ngOnInit(){
  }

  ngOnChanges(){}
  
}
