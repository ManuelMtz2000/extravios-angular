import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { TarjetasComponent } from './app/componentes/tarjetas/tarjetas.component';
import { AcercaComponent } from './app/views/acerca/acerca.component';
import { AyudaComponent } from './app/views/ayuda/ayuda.component';
import { PublicacionesComponent } from './app/views/publicaciones/publicaciones.component';
import { LoginComponent } from './app/views/login/login.component';
import { RegistroComponent } from './app/views/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './app/views/usuario/usuario.component';
import { ReportesComponent } from './app/views/reportes/reportes.component';
import { CookieService } from 'ngx-cookie-service';
import { BusquedaComponent } from './app/views/busqueda/busqueda.component';
import { SimpleCardSearchComponent } from './app/componentes/simple-card-search/simple-card-search.component';
import { ModalSearchDComponent } from './app/componentes/modal-search-d/modal-search-d.component';
import { ModalSearchRComponent } from './app/componentes/modal-search-r/modal-search-r.component';
import { VerificacionComponent } from './app/views/verificacion/verificacion.component';
import { RegistroEstudianteComponent } from './app/views/registro-estudiante/registro-estudiante.component';

@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    AyudaComponent,
    PublicacionesComponent,
    TarjetasComponent,
    LoginComponent,
    RegistroComponent,
    UsuarioComponent,
    ReportesComponent,
    BusquedaComponent,
    SimpleCardSearchComponent,
    ModalSearchDComponent,
    ModalSearchRComponent,
    VerificacionComponent,
    RegistroEstudianteComponent,
  ],
  entryComponents: [
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
