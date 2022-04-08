import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { Router } from '@angular/router';
import { Publicacion } from '../interfaces/Publicacion';
import { Usuario } from '../interfaces/Usuarios';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { takeUntil } from 'rxjs/operators';
import { Auxiliar } from '../interfaces/Auxiliar';

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
  usuario !: Usuario;
  constructor(private publicacionesService: PublicacionesService, private router: Router) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
    this.actualizar = false;
   }

  ngOnInit() {
    this.actualizar = false;
    this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
      this.publicacion = data;
      console.log(this.publicacion);
    });
    this.initInterval();
   }

   initInterval() {
    const interval$ = interval(5000);
    interval$.pipe(
      takeUntil(this.subject$)
    ).subscribe(s => {
      this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
        this.auxiliar = data;
        if(!(JSON.stringify(this.publicacion) === JSON.stringify(this.auxiliar))){
          this.publicacion = data;
          this.actualizar = true;
        }
      });
    });
   }

}
