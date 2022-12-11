import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { fromEvent, map, Observable } from 'rxjs';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  emprendimiento: any = {};
  existe: Boolean = false;
  cargando:boolean = true;
  constructor(
    private emprendimientoService: EmprendimientoService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    let id: String = '';
    this.router.params.subscribe((params) => {
      id = params['id'];
    });

    this.emprendimientoService.obtenerDatosDelEmprendimiento(id).subscribe({
      next: (data) => {
        this.loginService.setEmprendimiento(data);
        this.existe = true;
        this.emprendimiento = data; 
        if(this.emprendimiento.banner == null){
          this.emprendimiento.banner = 'assets/default.png';
        }else{
          this.emprendimiento.banner = `data:image/jpg;base64,${data.banner}`;
        }
        this.cargando = false;
      },
      error: (e) => {
        this.existe = false;
        this.cargando = false;
      },
    });
  }

  toBase64(blob: Blob): Observable<string> {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return fromEvent(reader, 'load')
      .pipe(map(() => (reader.result as string).split(',')[1]));
  }

  ngOnDestroy() {}
}
