import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from '../interfaces/Publicacion';
import { Usuario } from '../interfaces/Usuarios';
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
  usuario !: Usuario;
  categoria !: any;
  publicacion: Publicacion = {
    id: 0,
    tipoPublicacion: '',
    mostrarContacto: '',
    fotoObjeto: '',
    descObjetoC: '',
    descDetallada: '',
    fotoUsuario: '',
    autorPublicacion: '',
    categoriasPublicacion: '',
    lugar: '',
    statusPublicacion: ''
  };
  constructor(private publicacionesService: PublicacionesService, private router: Router) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  mostrarContacto(event: any){
    console.log(event);
  }

  getImage(event){
    this.imagen = event.target.files[0];
  }

  guardarPublicacion(){
    this.publicacion.tipoPublicacion = this.tipo ? 'Encontrar' : 'Buscar';
    this.publicacion.mostrarContacto = this.mostrar ? 'Si' : 'No';
    console.log(this.usuario?.id);
    const formData = new FormData();
    formData.append('id', this.usuario?.id.toString());
    formData.append('tipo_publicacion', this.publicacion.tipoPublicacion);
    formData.append('desc_objetoC', this.publicacion.descObjetoC);
    formData.append('desc_detallada', this.publicacion.descDetallada);
    formData.append('mostrar_contacto', this.publicacion.mostrarContacto);
    formData.append('lugar', this.publicacion.lugar);
    formData.append('categoriasPublicacion', this.publicacion.categoriasPublicacion);
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
