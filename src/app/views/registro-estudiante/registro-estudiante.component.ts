import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/Sesion';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.scss'],
})
export class RegistroEstudianteComponent implements OnInit {
  nombre = '';
  apellido1 = '';
  apellido2 = '';
  correo = '';
  correo2 = '';
  perfil!: any;
  datos!: string;
  sesion!: Sesion;
  ta!: any;
  letras !: any;
  banderaNombre = false;
  banderaAp1 = false;
  banderaAp2 = false;
  banderaCorreo = false;
  banderaCorreo2 = false;
  banderaConfirmar = false;
  banderaFormato = false;
  banderaFormato2 = false;
  banderaFormato3 = false;
  constructor(private userService: UsuariosService, private router: Router) { }

  ngOnInit() {}

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
    this.banderaFormato = false;
    this.banderaFormato2 = false;
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
    if(!(this.correo === this.correo2)) {
      bandera = true;
      this.banderaConfirmar = true;
    }
    if(!(this.nombre.match('^([A-Z]+[a-z]+.)+'))){
      bandera = true;
      this.banderaFormato = true;
    }
    if(!(this.apellido1.match('^([A-Z][a-z])+$'))){
      bandera = true;
      this.banderaFormato2 = true;
    }
    if(!(this.apellido2.match('^([A-Z][a-z])+$'))){
      bandera = true;
      this.banderaFormato2 = true;
    }
    return bandera;
  }

  registrarUsuario(){
    if(this.validar()) {
      return null;
    }
    const formData = new FormData();
    formData.append('nombre', this.nombre + ' ' + this.apellido1 + ' ' + this.apellido2);
    formData.append('correo', this.correo);
    if(this.datos.length > 0) {
      formData.append('datosContacto', this.datos);
    } else {
      formData.append('datosContacto', ' ');
    }
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('Accept', 'application/json');
    formData.append('curp', localStorage.getItem('codigo'));
    formData.append('tipo_usuario_id', '1');
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
