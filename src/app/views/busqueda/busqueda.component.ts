/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {
  query!: any;
  busqueda = '';
  publicaciones: Publicacion[] = [];
  bandera = false;
  usuario !: Usuario;
  constructor(private activatedRoute: ActivatedRoute, private publicacionesService: PublicacionesService, private router: Router) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    } else {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      if(this.usuario.verificado === null){
        this.router.navigate(['/registro/verificar']);
      }
    }
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.query = queryParams['id'];
      const formData = new FormData();
      formData.append('id', this.query);
      this.publicacionesService.buscaPublicacion(formData).subscribe((data: any) => {
        this.bandera = false;
        this.publicaciones = data;
      }, (error) => {
        this.publicaciones = null;
        this.bandera = true;
      });
    });
  }

}
