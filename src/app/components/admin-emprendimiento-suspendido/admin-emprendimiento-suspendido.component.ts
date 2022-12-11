import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';

@Component({
  selector: 'app-admin-emprendimiento-suspendido',
  templateUrl: './admin-emprendimiento-suspendido.component.html',
  styleUrls: ['./admin-emprendimiento-suspendido.component.css']
})
export class AdminEmprendimientoSuspendidoComponent {

  constructor(
    private emprendimientoService:EmprendimientoService,
    private route:ActivatedRoute
  ) {}

  mensajeSuspension:string = '';
  mostrar:boolean = false;
 // @Input() mensajeSuspension:string = "";
  feedback = {
    mensaje: '',
    class: ''
  }
  suspenderEmprendimiento(){
      let id = ''
      this.route.params.subscribe((params) => {          
        id = params['id'];
      });
      this.emprendimientoService.suspenderEmprendimiento(id,this.mensajeSuspension)
      .subscribe({
        next: (d) => {
          this.feedback.mensaje = "El emprendimiento fue suspendido";
          this.feedback.class = "alert-success";
          this.mostrar = false;
        },
        error: (e) => {
          this.feedback.mensaje = "Problemas al suspender el emprendimiento";
          this.feedback.class = "alert-danger";
        }
      })
  }

  mostrarSuspension(){
    this.mostrar = !this.mostrar;
  }

}
