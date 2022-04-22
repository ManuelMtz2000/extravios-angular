import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/Publicacion';

@Component({
  selector: 'app-modal-search-d',
  templateUrl: './modal-search-d.component.html',
  styleUrls: ['./modal-search-d.component.scss'],
})
export class ModalSearchDComponent implements OnInit {
  @Input() publicacion!: Publicacion;
  show = false;
  datos = false;
  constructor() { }

  ngOnInit() {
    if(this.publicacion.mostrarContacto) {
      this.datos = true;
    }
  }

}
