import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmprendimientoResp, Feedback, FormDonacion } from 'src/app/interfaces/responseType';
import { Donacion } from 'src/app/models/Donacion';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';

@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.css']
})
export class DonacionComponent implements OnInit {
  
  @Input() emprendimiento: EmprendimientoResp;
  @Output('nuevaDonacion') donacionNueva = new EventEmitter<Donacion>();

  total:number = 0;
  cantidadManguito:number = 1;
  donacion:FormDonacion = {
    nombre: "",
    contacto: "",
    mensaje: "",
    medioDePago: 0,
    cantidad: 1
  }

  feedback:Feedback = {
    mensaje: "",
    class: ""
  }

  constructor(private emprendimientoService:EmprendimientoService, private router:ActivatedRoute){
  }
  
  ngOnInit(): void {
  }

  ngOnChanges(){
    this.total = this.emprendimiento.precioManguito;
  }

  masManguito(){
    this.donacion.cantidad=this.donacion.cantidad + 1;
    this.total = this.emprendimiento.precioManguito * this.donacion.cantidad;
  }

  menosManguito(){
    if(this.donacion.cantidad == 1){
      return;
    }
    this.donacion.cantidad=this.donacion.cantidad - 1;
    this.total = this.emprendimiento.precioManguito * this.donacion.cantidad;
  }

  realizarDonacion(){
    this.donacion.medioDePago = Number(this.donacion.medioDePago);
    console.log(this.donacion);
    this.router.params.subscribe(params => {
      this.emprendimientoService.realizarDonacion(params["id"],this.donacion)
      .subscribe({
        next: (d) => {
          this.feedback.mensaje = "Nueva donacion realizada con exito";
          this.feedback.class = "alert-success";
          let {cantidad,mensaje,nombre} = this.donacion;
          this.donacionNueva.emit(new Donacion(0,cantidad,new Date().toDateString(),{},mensaje,nombre,0));
          this.total = this.emprendimiento.precioManguito;
          this.donacion = {
            nombre: "",
            contacto: "",
            mensaje: "",
            medioDePago: 0,
            cantidad: 1
          }
        },
        error: (e) => {
          this.feedback.mensaje = "Problemas al realizar la donación, intentelo en otro momento";
          this.feedback.class = "alert-danger";
        }
      })
    })
  }


}
