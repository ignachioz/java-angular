import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EdicionComponent } from './components/edicion/edicion.component';
import { RegistrarEmprendimientoComponent } from './components/registrar-emprendimiento/registrar-emprendimiento.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: "emprendimiento/:id",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent
  },
  { 
    path: 'registrar-emprendimiento', 
    component: RegistrarEmprendimientoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'perfil',
    component: EdicionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/crear-categoria',
    component: EditarCategoriaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/editar-categoria/:id',
    component: EditarCategoriaComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
