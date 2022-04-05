import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from '../interfaces/Publicacion';
import { Usuario } from '../interfaces/Usuarios';
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
  usuario !: Usuario;
  constructor(private publicacionesService: PublicacionesService, private router: Router) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
   }

  ngOnInit() {
    this.router.navigate(['tabs/inicio']);
    this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
      this.publicacion = data;
      console.log(this.publicacion);
    });
   }

}
