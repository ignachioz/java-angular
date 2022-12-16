import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-emprendimiento-suspendido',
  templateUrl: './emprendimiento-suspendido.component.html',
  styleUrls: ['./emprendimiento-suspendido.component.css']
})
export class EmprendimientoSuspendidoComponent implements OnInit, OnChanges, AfterViewInit{

  @Input() mensajeSuspension:string;
  @ViewChild('mensaje') divContainer: ElementRef;
  constructor(
    private render2:Renderer2,
    private loginService:LoginService,
    private router:Router
  ){

  }


  ngOnInit(){
  }

  cambiar(){
    const mensaje = this.divContainer.nativeElement;
    this.render2.setStyle(mensaje,"visibility","visible");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.mensajeSuspension !== ""){
      document.getElementsByTagName("body")[0].style.visibility = "hidden";
    }
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.cambiar();
    }, 500);
  }

  volver(){
    this.loginService.desloguearse();
    document.getElementsByTagName("body")[0].style.visibility = "visible";
    this.router.navigate(["/login"]);
  }


}
