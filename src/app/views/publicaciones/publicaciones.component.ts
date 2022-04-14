import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { PublicacionR } from 'src/app/interfaces/PublicacionR';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {
  usuario!: Usuario;
  publicaciones!: Publicacion[];
  publicacionesR!: PublicacionR[];
  subject$ = new Subject();

  constructor(private router: Router, private publicacionesService: PublicacionesService) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.publicacionesService.obtenerPublicacionUsuario(this.usuario?.id).subscribe((data: any) => {
      this.publicaciones = data[0];
      this.publicacionesR = data[1];
      console.log(this.publicacionesR);
    }, (error) => {
      console.log(error);
    });
    this.initInterval();
  }

  initInterval() {
    const interval$ = interval(15000);
    interval$.pipe(
      takeUntil(this.subject$)
    ).subscribe(s => {
      this.publicacionesService.obtenerPublicacionUsuario(this.usuario?.id).subscribe((data: any) => {
        this.publicaciones = data[0];
        this.publicacionesR = data[1];
      });
    });
  }
}
