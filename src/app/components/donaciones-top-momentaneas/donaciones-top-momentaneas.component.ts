import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmprendimientoResp } from 'src/app/interfaces/responseType';
import { Donacion } from 'src/app/models/Donacion';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';

@Component({
  selector: 'app-donaciones-top-momentaneas',
  templateUrl: './donaciones-top-momentaneas.component.html',
  styleUrls: ['./donaciones-top-momentaneas.component.css']
})
export class DonacionesTopMomentaneasComponent implements OnChanges{

  @Input() emprendimiento: EmprendimientoResp;
  donaciones: Array<Donacion>;
  @Input('nuevaDonacion') nuevaDonacion:Donacion;
  
  constructor(
    private emprendimientoService:EmprendimientoService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(){
    let id:string = "";
    this.router.params.subscribe(params => {
      id = params["id"];
    })
    this.emprendimientoService.obtenerDonaciones(id)
    .subscribe({
      next:((d) => {
        this.donaciones = d;
      })
    }
  )}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.nuevaDonacion){
      this.donaciones = [...this.donaciones,this.nuevaDonacion];
    }
  
  }
}
