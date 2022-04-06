import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { Router } from '@angular/router';
import { Publicacion } from '../interfaces/Publicacion';
import { Usuario } from '../interfaces/Usuarios';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  subject$ = new Subject();
  publicacion !: Publicacion[];
  usuario !: Usuario;
  constructor(private publicacionesService: PublicacionesService, private router: Router) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
   }

  ngOnInit() {
    this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
      this.publicacion = data;
      console.log(this.publicacion);
    });
    this.initInterval();
   }

   ngOnDestroy(){
     console.log('xd');
   }

   initInterval() {
    const interval$ = interval(30000);
    interval$.pipe(
      takeUntil(this.subject$)
    ).subscribe(s => {
      this.publicacionesService.obtenerPublicaciones().subscribe((data: any) => {
        this.publicacion = data;
        console.log(this.publicacion);
      });
    });
  }

}
