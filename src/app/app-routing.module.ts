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

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'entrar',
    component: LoginComponent
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
    path: 'tabs/inicio/reportar/:id',
    component: ReportesComponent
  },
  {
    path: 'busqueda',
    component: BusquedaComponent
  },
  {
    path: 'tabs/perfil/usuario',
    component: UsuarioComponent
  },
  {
    path: 'tabs/perfil/acerca',
    component: AcercaComponent
  },
  {
    path: 'tabs/perfil/ayuda',
    component: AyudaComponent
  },
  {
    path: 'tabs/perfil/publicaciones',
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
