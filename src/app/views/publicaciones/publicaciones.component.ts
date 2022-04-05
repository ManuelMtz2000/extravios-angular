import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {
  usuario!: Usuario;
  publicaciones!: Publicacion[];

  constructor(private router: Router, private publicacionesService: PublicacionesService) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.publicacionesService.obtenerPublicacionUsuario(this.usuario?.id).subscribe((data: any) => {
      this.publicaciones = data;
      console.log(this.publicaciones);
    }, (error) => {
      console.log(error);
    });
  }

}
