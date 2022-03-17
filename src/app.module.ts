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

@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    AyudaComponent,
    PublicacionesComponent,
    TarjetasComponent,
    LoginComponent,
    RegistroComponent
  ],
  entryComponents: [
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
