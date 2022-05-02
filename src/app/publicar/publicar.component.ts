import { HttpErrorResponse } from '@angular/common/http';
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
  codigo = false;
  codigoTxt = '';
  banderaCodigo = false;
  banderaDescC = false;
  banderaDescD = false;
  banderaEtiqueta = false;
  banderaCategoria = false;
  banderaLugar = false;
  banderaImagen = false;
  e1 = '';
  e2 = '';
  e3 = '';
  e4 = '';
  e5 = '';
  etiquetas: string[] = [];
  publicacion: Publicacion = {
    id: 0,
    tipoPublicacion: '',
    mostrarContacto: '',
    fotoObjeto: '',
    descObjetoC: '',
    descDetallada: '',
    fotoUsuario: '',
    autorPublicacion: '',
    idAutor: '',
    categoriasPublicacion: '',
    lugar: '',
    statusPublicacion: ''
  };
  constructor(private publicacionesService: PublicacionesService, private router: Router) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    } else {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      if(this.usuario.verificado === null){
        this.router.navigate(['/registro/verificar']);
      }
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

  required(cadena: string){
    if(cadena.length > 0){
      return true;
    }
    return false;
  }

  guardarPublicacion(){
    let bandera = true;
    this.banderaCodigo = false;
    this.banderaDescC = false;
    this.banderaDescD = false;
    this.banderaEtiqueta = false;
    this.banderaCategoria = false;
    this.banderaImagen = false;
    this.banderaLugar = false;
    if(this.codigo){
      if(this.codigoTxt.toString().length < 9 || this.codigoTxt.toString().length > 9) {
        this.banderaCodigo = true;
        bandera = false;
      }
    }
    if(!this.required(this.publicacion.descObjetoC)){
      this.banderaDescC = true;
      bandera = false;
    }
    if(!this.required(this.publicacion.descDetallada)){
      this.banderaDescD = true;
      bandera = false;
    }
    if(!this.required(this.e1) && !this.required(this.e2)
    && !this.required(this.e3) && !this.required(this.e4) && !this.required(this.e5))
    {
      this.banderaEtiqueta = true;
      bandera = false;
    }
    if(!this.e1.match('^([a-zA-Z])*$') || !this.e2.match('^([a-zA-Z])*$')
    || !this.e3.match('^([a-zA-Z])*$') || !this.e4.match('^([a-zA-Z])*$') || !this.e5.match('^([a-zA-Z])*$')) {
      this.banderaEtiqueta = true;
      bandera = false;
    }
    if(!this.required(this.publicacion.lugar)) {
      this.banderaLugar = true;
      bandera = false;
    }
    if(!this.required(this.publicacion.categoriasPublicacion)){
      this.banderaCategoria = true;
      bandera = false;
    }
    if(!this.imagen) {
      this.banderaImagen = true;
      bandera = false;
    }
    if(bandera === false) {
      return null;
    }
    if(this.e1.length > 0) { this.etiquetas.push(this.e1.toLocaleLowerCase()); }
    if(this.e2.length > 0) { this.etiquetas.push(this.e2.toLocaleLowerCase()); }
    if(this.e3.length > 0) { this.etiquetas.push(this.e3.toLocaleLowerCase()); }
    if(this.e4.length > 0) { this.etiquetas.push(this.e4.toLocaleLowerCase()); }
    if(this.e5.length > 0) { this.etiquetas.push(this.e5.toLocaleLowerCase()); }
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
    formData.append('etiquetas', JSON.stringify(this.etiquetas));
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('Accept', 'application/json');
    formData.append('imagen', this.imagen);
    this.publicacionesService.guardarPublicacion(formData).subscribe((data: any) => {
      alert('Guardado');
      this.router.navigate(['tabs/inicio']);
      this.ngOnInit();
    }, (error) => {
      if(error instanceof HttpErrorResponse) {
        if(error.status === 422){
          alert('Formato de los campos no valido, revise y vuelva intentar.');
        }
      }
    });
  }

}
