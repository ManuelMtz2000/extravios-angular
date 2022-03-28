import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  show = false;
  publicacion !: Publicacion;
  id !: any;
  constructor(private router: Router, private publicacionesService: PublicacionesService, private activatedRoute: ActivatedRoute) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if(this.id){
        this.publicacionesService.obtenerPublicacion(this.id).subscribe((data: any) => {
          this.publicacion = data;
        }, (error) => {
          console.log(error);
        });
      }
    });
  }

}
