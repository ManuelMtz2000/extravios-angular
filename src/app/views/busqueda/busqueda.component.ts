/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

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
  arreglo !: any[];
  constructor(private activatedRoute: ActivatedRoute, private publicacionesService: PublicacionesService, private router: Router,
    private userService: UsuariosService) {
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
      this.query = queryParams['busqueda'];
      const formData = new FormData();
      if(localStorage.getItem('busqueda')){
        this.arreglo = JSON.parse(localStorage.getItem('busqueda'));
        this.arreglo.forEach((arreglo) => {formData.append('busquedaArray[]', arreglo.tag.es);});
      } else {
        formData.append('busqueda', this.query.toLowerCase());
      }
      this.publicacionesService.buscaPublicacion(formData).subscribe((data: any) => {
        this.bandera = false;
        this.publicaciones = data;
        this.userService.deleteBusquedaToken();
      }, (error) => {
        this.publicaciones = null;
        this.bandera = true;
        this.userService.deleteBusquedaToken();
      });
    });
  }

}
