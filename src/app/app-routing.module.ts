import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AcercaComponent } from './views/acerca/acerca.component';
import { AyudaComponent } from './views/ayuda/ayuda.component';
import { PublicacionesComponent } from './views/publicaciones/publicaciones.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { ReportesComponent } from './views/reportes/reportes.component';
import { BusquedaComponent } from './views/busqueda/busqueda.component';
import { VerificacionComponent } from './views/verificacion/verificacion.component';
import { RegistroEstudianteComponent } from './views/registro-estudiante/registro-estudiante.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/entrar',
    pathMatch: 'full',
  },
  {
    path: 'entrar',
    component: LoginComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'registro/verificar',
    component: VerificacionComponent
  },
  {
    path: 'siiau',
    component: RegistroEstudianteComponent
  },
  {
    path: 'app/tabs/inicio/reportar/:id',
    component: ReportesComponent
  },
  {
    path: 'busqueda',
    component: BusquedaComponent
  },
  {
    path: 'app/tabs/perfil/usuario/:id',
    component: UsuarioComponent
  },
  {
    path: 'app/tabs/perfil/acerca',
    component: AcercaComponent
  },
  {
    path: 'app/tabs/perfil/ayuda',
    component: AyudaComponent
  },
  {
    path: 'app/tabs/perfil/publicaciones',
    component: PublicacionesComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
