import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {

  mostrarPorSeccion = "perfil";

  @Output() elementoClickeado = new EventEmitter<string>();

  goTo(irA:string){
    this.elementoClickeado.emit(irA);
  }
}
