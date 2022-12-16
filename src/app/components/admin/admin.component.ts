import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/interfaces/responseType';
import { Categoria } from 'src/app/models/Categoria';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  feedback: Feedback = {
    mensaje: '',
    class: ''
  }
  cargando:boolean = true;

  categorias:Array<Categoria> = [];
  mostrarEliminar: boolean = false;
  categoriaEliminar: Categoria = {
    id: 0,
    nombre: ""
  };

  constructor(
    private configuracionService:ConfiguracionService,
    private router:Router
  ) {}

    ngOnInit(): void {
      this.configuracionService.obtenerCategorias()
      .subscribe(d => {
        this.categorias = d;
        this.cargando = false;
      })
    }

    editarCategoria(categoriaId:number) {
      this.router.navigate(["/admin/editar-categoria/"+categoriaId]);
    }

    borrarCategoria(categoria:Categoria) {
      this.mostrarEliminar = true;
      this.categoriaEliminar.id = categoria.id;
      this.categoriaEliminar.nombre = categoria.nombre;
    }

    cerrarEliminar(){
      this.categoriaEliminar.nombre = "";
      this.categoriaEliminar.id = 0;
      this.mostrarEliminar = false;
    }

    confirmarEliminacionCategoria(){
      if(this.mostrarEliminar = true){
        //hacer eliminación desde el back y llamarlo aca.
        this.configuracionService.eliminarCategoria(this.categoriaEliminar.id)
        .subscribe({
          next: (d) => {
            this.categorias = this.categorias.filter(c => c.id !== this.categoriaEliminar.id);
            this.categoriaEliminar.nombre = "";
            this.categoriaEliminar.id = 0;
            this.mostrarEliminar = false;
            this.feedback.mensaje = "Categoria eliminada exitosamente";
            this.feedback.class = "alert-success";
          },
          error: (e) => {
            this.feedback.mensaje = "Problemas al eliminar la categoria";
            this.feedback.class = "alert-danger";
            this.mostrarEliminar = false;
          }
        });
      }
    }

    crearCategoria(){
      this.router.navigate(["/admin/crear-categoria"]);
    }
}
