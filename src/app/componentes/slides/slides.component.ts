import { Component, Input, OnInit } from '@angular/core';
import { Auxiliar } from 'src/app/interfaces/Auxiliar';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})

export class SlidesComponent implements OnInit {
  @Input() publicaciones: Publicacion[];
  @Input() text: string;
  usuario !: Usuario;
  bandera = true;
  ruta = '../../..';
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private publicacionesService: PublicacionesService) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    console.log(this.usuario.id);
  }
}
