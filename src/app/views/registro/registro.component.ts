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
  nombre!: string;
  apellido1!: string;
  apellido2!: string;
  correo!: string;
  contrasenia!: string;
  curp!: string;
  imagen!: any;
  perfil!: any;
  datos!: string;
  sesion!: Sesion;
  constructor(private userService: UsuariosService, private router: Router) { }

  ngOnInit() {}

  getImage(event){
    this.imagen = event.target.files[0];
  }

  getPerfil(event){
    this.perfil = event.target.files[0];
  }

  registrarUsuario(){
    const formData = new FormData();
    formData.append('nombre', this.nombre + ' ' + this.apellido1 + ' ' + this.apellido2);
    formData.append('correo', this.correo);
    formData.append('contrasenia', this.contrasenia);
    formData.append('curp', this.curp);
    formData.append('datosContacto', this.datos);
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('Accept', 'application/json');
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
