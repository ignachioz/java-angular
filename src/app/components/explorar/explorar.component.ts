import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { emprendimientoResp } from 'src/app/interfaces/responseType';
import { Categoria } from 'src/app/models/Categoria';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit{
  emprendimientos:Array<emprendimientoResp> = [];
  emprendimientosFiltrados:Array<emprendimientoResp> = [];
  categorias:Array<Categoria> = [];
  cargando:boolean = true;
  meClickearon:string = "mas-vistos";
  constructor(
    private emprendimientoService:EmprendimientoService,
    private configuracionService:ConfiguracionService,
    private router:Router
    ){}

  ngOnInit(): void {
    this.emprendimientoService.obtenerTodosLosEmprendimientos()
    .subscribe(d => {
      this.emprendimientos = d.filter(e => e.mensajeSuspension === '');
      this.masVistos();
      this.cargando = false;
    })
    this.configuracionService.obtenerCategorias()
    .subscribe(d => {
      this.categorias = d;
    })
  }

  masVistos(){
    this.emprendimientosFiltrados = this.emprendimientos.sort((e1:any,e2:any) => e1.cantidadVisitas - e2.cantidadVisitas).reverse();
    this.meClickearon = 'mas-vistos'
  }

  masDonaciones(){
    this.emprendimientosFiltrados = this.emprendimientos.sort((e1:any,e2:any) => e1.cantidadManguitosRecibidos - e2.cantidadManguitosRecibidos).reverse();
    this.meClickearon = 'mas-donaciones'
  }

  porCategoria(nombre:string){
    this.emprendimientosFiltrados = this.emprendimientos.filter(e => e.categorias.some(em => em.nombre == nombre));
  }

  irAlEmprendimiento(id:any){
    this.router.navigate(["/emprendimiento/"+id])
  }

}
