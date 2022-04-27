import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/Sesion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ruta = '../../../';
  tipo = false;
  credenciales = false;
  correo!: string;
  password!: string;
  codigo!: string;
  sesion!: Sesion;
  estudiante!: Usuario;
  xhttp = new XMLHttpRequest();
  constructor(private userService: UsuariosService, private router: Router) {
    if(this.userService.getToken('sesion') && this.userService.getToken('user')){
      this.router.navigate(['tabs/inicio']);
    } else {
      console.log('Nel');
    }
   }

  login(){
    const formData = new FormData();
    formData.append('contrasenia', this.password);
    formData.append('Accept', 'application/json');
    if(this.tipo){
      formData.append('correo', this.correo);
      this.userService.login(formData).subscribe((data: any) => {
        this.sesion = data;
        this.userService.setToken('sesion', this.sesion.token);
        this.userService.setToken('user', JSON.stringify(this.sesion.user));
        this.correo = '';
        this.password = '';
        this.credenciales = false;
        if(this.sesion.user.verificado !== null){
            this.router.navigate(['tabs/inicio']);
        } else {
            this.router.navigate(['/registro/verificar']);
        }
      }, (error) => {
        this.credenciales = true;
      });
    } else {
      this.xhttp.onreadystatechange = () => {
          if (this.xhttp.readyState === 4 && this.xhttp.status === 200) {
             // Typical action to be performed when the document is ready:
             if(this.xhttp.responseText === '[0]'){
               this.credenciales = true;
             } else {
               this.estudiante = JSON.parse(this.xhttp.responseText);
               console.log(this.estudiante);
               formData.append('codigo', this.codigo);
               formData.append('Accept', 'application/json');
               this.userService.loginSiiau(formData).subscribe((data: any) => {
                this.sesion = {token: data, user: this.estudiante};
                this.correo = '';
                this.password = '';
                this.credenciales = false;
               }, (error) => {
                  this.credenciales = true;
               });
               this.userService.verificarSiiau(formData).subscribe((data: any) => {
                 if(data.msg){
                  this.userService.setToken('codigo', this.codigo);
                  this.router.navigate(['siiau']);
                 } else {
                   console.log('se encontro');
                 }
               });
             }
          }
      };
      this.xhttp.open('GET', 'https://siiauec.000webhostapp.com/VerUsuario.php?codigo=' + this.codigo, true);
      this.xhttp.send();
    }
  }

  ngOnInit() {}

}
