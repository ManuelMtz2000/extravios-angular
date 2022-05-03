import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { Router } from '@angular/router';
import { Publicacion } from '../interfaces/Publicacion';
import { Usuario } from '../interfaces/Usuarios';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { takeUntil } from 'rxjs/operators';
import { Auxiliar } from '../interfaces/Auxiliar';
import { UsuariosService } from '../servicios/usuarios.service';

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
  actualizar = false;
  arreglo!: Auxiliar;
  subject$ = new Subject();
  publicacion !: Publicacion[];
  auxiliar !: Publicacion[];
  text = '';
  busqueda = '';
  usuario !: Usuario;
  imagen !: any;
  constructor(private publicacionesService: PublicacionesService, private userService: UsuariosService, private router: Router) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    } else {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      if(this.usuario.verificado === null){
        this.router.navigate(['/registro/verificar']);
      }
    }
    this.actualizar = false;
   }

  ngOnInit() {
    this.actualizar = false;
    this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
      this.publicacion = data;
    });
    this.initInterval();
   }

   initInterval() {
    const interval$ = interval(32000);
    interval$.pipe(
      takeUntil(this.subject$)
    ).subscribe(s => {
      this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
        this.auxiliar = data;
        if(!(JSON.stringify(this.publicacion) === JSON.stringify(this.auxiliar))){
          this.actualizar = true;
        }
      });
    });
   }

   buscar(){
    const formData = new FormData();
    formData.append('id', this.busqueda.toLowerCase());
    formData.append('Accept', 'application/json');
    this.publicacionesService.buscaPublicacion(formData).subscribe((data: any) => { });
   }

   getImage(event){
    this.imagen = event.target.files[0];
    const formData = new FormData();
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('Accept', 'application/json');
    formData.append('imagen', this.imagen);
    this.publicacionesService.busquedaInteligente(formData).subscribe((data: any) => {
      this.userService.setToken('busqueda', JSON.stringify(data.result.tags));
      this.router.navigate(['busqueda']);
    }, (error) => { });
   }

}
