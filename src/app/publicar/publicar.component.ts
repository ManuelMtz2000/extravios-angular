import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from '../interfaces/Publicacion';
import { PublicacionesService } from '../servicios/publicaciones.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss'],
})

export class PublicarComponent implements OnInit {
  tipo = false;
  mostrar = false;
  imagen !: any;
  publicacion: Publicacion = {
    id: 0,
    tipoPublicacion: '',
    mostrarContacto: '',
    fotoObjeto: '',
    descObjetoC: '',
    descDetallada: '',
    autorPublicacion: '',
    lugar: ''
  };
  constructor(private publicacionesService: PublicacionesService) { }

  ngOnInit() {}

  mostrarContacto(event: any){
    console.log(event);
  }

  getImage(event){
    this.imagen = event.target.files[0];
  }

  guardarPublicacion(){
    this.publicacion.tipoPublicacion = this.tipo ? 'Encontrar' : 'Buscar';
    this.publicacion.mostrarContacto = this.mostrar ? 'Si' : 'No';
    const formData = new FormData();
    formData.append('tipo_publicacion', this.publicacion.tipoPublicacion);
    formData.append('desc_objetoC', this.publicacion.descObjetoC);
    formData.append('desc_detallada', this.publicacion.descDetallada);
    formData.append('mostrar_contacto', this.publicacion.mostrarContacto);
    formData.append('lugar', this.publicacion.lugar);
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('Accept', 'application/json');
    formData.append('imagen', this.imagen);
    this.publicacionesService.guardarPublicacion(formData).subscribe((data: any) => {
      alert('Guardado');
    }, (error) => {
      console.log(error);
    });
  }

}
