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
  nombre!: string;
  apellido1!: string;
  apellido2!: string;
  correo!: string;
  perfil!: any;
  datos!: string;
  sesion!: Sesion;
  ta!: any;
  letras !: any;
  constructor(private userService: UsuariosService, private router: Router) { }

  ngOnInit() {}

  getPerfil(event){
    this.perfil = event.target.files[0];
  }

  registrarUsuario(){
    const formData = new FormData();
    formData.append('nombre', this.nombre + ' ' + this.apellido1 + ' ' + this.apellido2);
    formData.append('correo', this.correo);
    formData.append('datosContacto', this.datos);
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
