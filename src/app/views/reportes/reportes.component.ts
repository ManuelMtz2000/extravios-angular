import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  constructor(private publicacionesService: PublicacionesService, private activatedRoute: ActivatedRoute) {
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

  ngOnInit() {}

}
