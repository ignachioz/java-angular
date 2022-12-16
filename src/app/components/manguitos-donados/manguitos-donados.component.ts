import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Donacion } from 'src/app/models/Donacion';

@Component({
  selector: 'app-manguitos-donados',
  templateUrl: './manguitos-donados.component.html',
  styleUrls: ['./manguitos-donados.component.css']
})
export class ManguitosDonadosComponent implements OnInit, OnChanges{
  @Input() donaciones:Array<Donacion>;
  manguitosRecibidos: number;

  page:number = 1;

  constructor() {}

  ngOnInit(){
    //this.filtradoDeDonaciones();
  }

  filtradoDeDonaciones(){
    this.donaciones = this.donaciones.map((d:Donacion) => {
      return {
        ...d,
        fecha: new Date(d.fecha).toLocaleDateString()
      }
    });
  }

  ngOnChanges(){
    this.filtradoDeDonaciones();
    if(this.donaciones.length > 0){
      let suma = 0;
      this.donaciones.forEach((d:Donacion) => suma+=d.cantidad);
      this.manguitosRecibidos = suma;
    }else{
      this.manguitosRecibidos = 0;
    }
  }

}
