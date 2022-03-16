import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SlidesComponent } from '../componentes/slides/slides.component';

import { InicioComponent } from './inicio.component';
import { CardComponent } from '../componentes/card/card.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [InicioComponent, SlidesComponent, CardComponent],
  exports: [InicioComponent]
})
export class InicioComponentModule {}
