import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';

@Component({
  selector: 'app-top-donadores',
  templateUrl: './top-donadores.component.html',
  styleUrls: ['./top-donadores.component.css']
})
export class TopDonadoresComponent implements OnInit {
  donaciones: any;
  constructor(private emprendimientoService: EmprendimientoService, private router:ActivatedRoute){

  }



  ngOnInit(){
    let id:String = "";
    this.router.params.subscribe(params => {
      id = params["id"];
    })
    this.emprendimientoService.obtenerDonaciones(id)
    .subscribe({
      next:((d) => {
        /* console.log(new Date(d[0].fecha).toLocaleDateString()); */
        this.donaciones = d.map(data => (
          {
            "cantidad": data.cantidad,
            "nombre": data.nombre
          }
        ));
        this.donaciones = this.donaciones.sort((a:any,b:any) => a.cantidad-b.cantidad).reverse().slice(0,10); //ordeno para hacer el top de donaciones
      })
    }
  )}


}
