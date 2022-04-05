import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/Sesion';
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
  sesion!: Sesion;
  constructor(private userService: UsuariosService, private router: Router) {
    if(this.userService.getToken('sesion') && this.userService.getToken('user')){
      this.router.navigate(['tabs/inicio']);
    } else {
      console.log('Nel');
    }
   }

  login(){
    const formData = new FormData();
    const currentRoute = 'tabs/inicio';
    formData.append('correo', this.correo);
    formData.append('contrasenia', this.password);
    formData.append('Accept', 'application/json');
    this.userService.login(formData).subscribe((data: any) => {
      this.sesion = data;
      this.userService.setToken('sesion', this.sesion.token);
      this.userService.setToken('user', JSON.stringify(this.sesion.user));
      this.correo = '';
      this.password = '';
      this.router.navigateByUrl('tabs/inicio', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentRoute]);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {}

}
