import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { RouterModule } from '@angular/router';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SlidesComponent } from '../componentes/slides/slides.component';
import { InicioComponent } from '../inicio/inicio.component';
import { CardComponent } from '../componentes/card/card.component';
import { ModalComponent } from '../componentes/modal/modal.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { ModalReclamarComponent } from '../componentes/modal-reclamar/modal-reclamar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, InicioComponent, SlidesComponent, CardComponent, ModalComponent, FilterPipe, ModalReclamarComponent]
})
export class Tab1PageModule {}
