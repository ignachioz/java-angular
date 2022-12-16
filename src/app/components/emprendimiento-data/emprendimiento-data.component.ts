import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { EmprendimientoResp } from 'src/app/interfaces/responseType';
import { Donacion } from 'src/app/models/Donacion';

@Component({
  selector: 'app-emprendimiento-data',
  templateUrl: './emprendimiento-data.component.html',
  styleUrls: ['./emprendimiento-data.component.css']
})
export class EmprendimientoDataComponent implements OnInit {

  
  @Input() emprendimiento: EmprendimientoResp;
  @Input('esMiEmprendimiento') esMiEmprendimiento:Boolean = false ;
  donacionNueva:Donacion;
  
  constructor(private route:ActivatedRoute, private router:Router){}
  
  ngOnInit(){
  }

  ngOnChanges(){}

  nuevaDonacion(donacion:Donacion){
    this.donacionNueva = donacion;
  }
  
}
