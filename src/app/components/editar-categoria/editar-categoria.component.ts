import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/interfaces/responseType';
import { Categoria } from 'src/app/models/Categoria';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css'],
})
export class EditarCategoriaComponent implements OnInit {

  feedback:Feedback = {
    mensaje: '',
    class: '',
  };

  edicion: boolean = false;

  cargando: boolean = false;

  categoria: Categoria = {
    id: 0,
    nombre: '',
  };

  constructor(
    private configuracionService: ConfiguracionService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id: string = '';
    this.router.params.subscribe((params) => {
      id = params['id'];
      if(id){
        this.cargando = true;
        this.edicion = true;
        this.configuracionService.obtenerCategoria(id).subscribe((d) => {
          this.categoria = d;
          this.cargando = false;
        });
      }
    });
  }

  editarCategoria() {
    if(!this.checkLongitudCategoria(this.categoria.nombre)){
      return;
    }
    this.configuracionService.editarCategoria(this.categoria).subscribe({
      next: (d) => {
        this.feedback.mensaje = 'La categoria ha sido actualizada con exito';
        this.feedback.class = 'alert-success';
      },
      error: (e) => {
        console.log(e);
        this.feedback.mensaje = e.error.msg;
        this.feedback.class = 'alert-danger';
      },
    });
  }

  checkLongitudCategoria(nombre: string):boolean {
    if (nombre.length < 3) {
      this.feedback.mensaje = 'El nombre de la categoria debe tener mas de 3 caracteres';
      this.feedback.class = 'alert-danger';
      return false;
    }
    return true;
  }

  crearCategoria() {
    if(!this.checkLongitudCategoria(this.categoria.nombre)){
      return;
    }
    
    this.configuracionService.crearCategoria(this.categoria.nombre).subscribe({
      next: (d) => {
        this.feedback.mensaje = 'La categoria ha sido creada con exito';
        this.feedback.class = 'alert-success';
      },
      error: (e) => {
        this.feedback.mensaje = e.error.msg;
        this.feedback.class = 'alert-danger';
      },
    });
  }
}
