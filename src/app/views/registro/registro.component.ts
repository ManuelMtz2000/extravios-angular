import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';

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
  constructor(private userService: UsuariosService, private router: Router) { }

  ngOnInit() {}

  registrarUsuario(){
    const formData = new FormData();
    formData.append('nombre', this.nombre + ' ' + this.apellido1 + ' ' + this.apellido2);
    formData.append('correo', this.correo);
    formData.append('contrasenia', this.contrasenia);
    formData.append('curp', this.curp);
    this.userService.nuevoUsuario(formData).subscribe((data) => {
      alert('Usuario registrado');
      this.router.navigate(['tabs/inicio']);
    }, (error) => {
      console.log(error);
    });
  }
}
