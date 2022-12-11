import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import { UserService } from './services/user.service';
import { EmprendimientoService } from './services/emprendimiento.service';
import { EmprendimientoDataComponent } from './components/emprendimiento-data/emprendimiento-data.component';
import { TopDonadoresComponent } from './components/top-donadores/top-donadores.component';
import { DonacionComponent } from './components/donacion/donacion.component';
import { RegistrarEmprendimientoComponent } from './components/registrar-emprendimiento/registrar-emprendimiento.component';
import { ConfiguracionService } from './services/configuracion.service';
import { EdicionComponent } from './components/edicion/edicion.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { PlanesComponent } from './components/planes/planes.component';
import { DonacionesPerfilComponent } from './components/donaciones-perfil/donaciones-perfil.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EmprendimientoSuspendidoComponent } from './components/emprendimiento-suspendido/emprendimiento-suspendido.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { AdminEmprendimientoSuspendidoComponent } from './components/admin-emprendimiento-suspendido/admin-emprendimiento-suspendido.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavbarComponent,
    EmprendimientoDataComponent,
    TopDonadoresComponent,
    DonacionComponent,
    RegistrarEmprendimientoComponent,
    EdicionComponent,
    BarraLateralComponent,
    PerfilComponent,
    PagosComponent,
    PlanesComponent,
    DonacionesPerfilComponent,
    UsuarioPerfilComponent,
    AdminComponent,
    EditarCategoriaComponent,
    EmprendimientoSuspendidoComponent,
    ExplorarComponent,
    AdminEmprendimientoSuspendidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    EmprendimientoService,
    ConfiguracionService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
