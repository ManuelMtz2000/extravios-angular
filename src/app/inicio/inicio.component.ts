import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../interfaces/Publicacion';
import { PublicacionesService } from '../servicios/publicaciones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  publicacion !: Publicacion[];
  constructor(private publicacionesService: PublicacionesService) { }

  ngOnInit() {
    this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
      this.publicacion = data;
      console.log(this.publicacion);
    });
  }

}
