import { Component, OnInit } from '@angular/core';
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
  publicacion: Publicacion = {
    id: 0,
    tipoPublicacion: '',
    mostrarContacto: '',
    fotoObjeto: '',
    descObjetoC: '',
    descDetallada: '',
    lugar: ''
  };
  constructor(private publicacionesService: PublicacionesService) { }

  ngOnInit() {}

  mostrarContacto(event: any){
    console.log(event);
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
    this.publicacionesService.guardarPublicacion(formData).subscribe((data: any) => {
      alert('Guardado');
    }, (error) => {
      console.log(error);
    });
  }

}
