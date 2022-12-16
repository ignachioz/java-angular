import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { Donacion } from 'src/app/models/Donacion';

@Component({
  selector: 'app-top-donadores',
  templateUrl: './top-donadores.component.html',
  styleUrls: ['./top-donadores.component.css']
})
export class TopDonadoresComponent implements OnInit, OnChanges{

  @Input() donaciones: any;

  constructor(){

  }

  ngOnInit(){
   this.topDonadores();
  }


  topDonadores(){
    this.donaciones = this.donaciones.map((data:Donacion) => (
      {
        cantidad: data.cantidad,
        nombre: data.nombre
      }
    ));
    this.donaciones = this.donaciones.sort((a:any,b:any) => a.cantidad-b.cantidad).reverse().slice(0,10); //ordeno para hacer el top de donaciones
  }

  ngOnChanges(){
    this.topDonadores();
  }



}
