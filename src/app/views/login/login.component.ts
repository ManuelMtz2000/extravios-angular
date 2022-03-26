import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ruta = '../../../';
  tipo = false;
  correo!: string;
  password!: string;
  constructor(private userService: UsuariosService) { }

  login(){
    const formData = new FormData();
    formData.append('correo', this.correo);
    formData.append('contrasenia', this.password);
    formData.append('Accept', 'application/json');
    this.userService.login(formData).subscribe((data: any) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {}

}
