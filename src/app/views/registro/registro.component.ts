import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/Sesion';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  nombre = '';
  apellido1 = '';
  apellido2 = '';
  correo = '';
  correo2 = '';
  contrasenia = '';
  contrasenia2 = '';
  curp = '';
  imagen!: any;
  perfil!: any;
  datos = '';
  sesion!: Sesion;
  ta!: any;
  letras !: any;
  banderaNombre = false;
  banderaAp1 = false;
  banderaAp2 = false;
  banderaCorreo = false;
  banderaCorreo2 = false;
  banderaContrasenia = false;
  banderaContrasenia2 = false;
  banderaCurp = false;
  banderaImagen = false;
  banderaConfirmar = false;
  banderaConfirmar2 = false;
  banderaFormato = false;
  banderaFormato2 = false;
  banderaFormato3 = false;
  banderaFormatoCURP = false;
  constructor(private userService: UsuariosService, private router: Router) { }

  ngOnInit() {}

  getImage(event){
    this.imagen = event.target.files[0];
  }

  getPerfil(event){
    this.perfil = event.target.files[0];
  }

  validar(){
    let bandera = false;
    this.banderaNombre = false;
    this.banderaAp1 = false;
    this.banderaAp2 = false;
    this.banderaCorreo = false;
    this.banderaCorreo2 = false;
    this.banderaConfirmar = false;
    this.banderaConfirmar2 = false;
    this.banderaFormato = false;
    this.banderaFormato2 = false;
    this.banderaFormato3 = false;
    this.banderaContrasenia = false;
    this.banderaCurp = false;
    this.banderaImagen = false;
    this.banderaFormatoCURP = false;
    if(!(this.nombre.length > 0)) {
      bandera = true;
      this.banderaNombre = true;
    }
    if(!(this.apellido1.length > 0)) {
      bandera = true;
      this.banderaAp1 = true;
    }
    if(!(this.apellido2.length > 0)) {
      bandera = true;
      this.banderaAp2 = true;
    }
    if(!(this.correo.length > 0)) {
      bandera = true;
      this.banderaCorreo = true;
    }
    if(!(this.correo2.length > 0)) {
      bandera = true;
      this.banderaCorreo2 = true;
    }
    if(!(this.contrasenia.length > 0)) {
      bandera = true;
      this.banderaContrasenia = true;
    }
    if(!(this.contrasenia2.length > 0)) {
      bandera = true;
      this.banderaContrasenia2 = true;
    }
    if(!(this.correo === this.correo2)) {
      bandera = true;
      this.banderaConfirmar = true;
    }
    if(!(this.contrasenia === this.contrasenia2)) {
      bandera = true;
      this.banderaConfirmar2 = true;
    }
    if(!(this.curp.length > 0)) {
      bandera = true;
      this.banderaCurp = true;
    }
    if(!(this.curp.match('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]'
    +'|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|'
    + 'CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|'
    + 'TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$'))) {
      bandera = true;
      this.banderaFormatoCURP = true;
    }
    if(this.contrasenia.length > 16 || this.contrasenia.length < 8) {
      bandera = true;
      this.banderaFormato3 = true;
    }
    if(!(this.nombre.match('^([A-Z][a-z]+.)+'))){
      bandera = true;
      this.banderaFormato = true;
    }
    if(!(this.apellido1.match('^([A-Z]+[a-z]+.)+'))){
      bandera = true;
      this.banderaFormato2 = true;
    }
    if(!(this.apellido2.match('^([A-Z]+[a-z]+.)+'))){
      bandera = true;
      this.banderaFormato2 = true;
    }
    if(!this.imagen){
      bandera = true;
      this.banderaImagen = true;
    }
    return bandera;
  }

  registrarUsuario(){
    const formData = new FormData();
    if(this.validar()){
      return null;
    }
    console.log(this.datos);
    formData.append('nombre', this.nombre + ' ' + this.apellido1 + ' ' + this.apellido2);
    formData.append('correo', this.correo);
    formData.append('contrasenia', this.contrasenia);
    formData.append('curp', this.curp);
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('Accept', 'application/json');
    formData.append('tipo_usuario_id', '2');
    if(this.datos.length > 0) {
      formData.append('datosContacto', this.datos);
    } else {
      formData.append('datosContacto', ' ');
    }
    formData.append('imagen', this.imagen);
    formData.append('perfil', this.perfil);
    this.userService.nuevoUsuario(formData).subscribe((data: any) => {
        this.sesion = data;
        this.userService.setToken('sesion', this.sesion.token);
        this.userService.setToken('user', JSON.stringify(this.sesion.user));
      alert('Usuario registrado');
      this.router.navigate(['registro/verificar']);
    }, (error) => {
      alert('Ocurrio un error al tratar de registrarse, puede deberse a fallas de conexión' +
      'o un correo ya registrado en la plataforma, vuelva a intentarlo.');
    });
  }
}
