import { HttpErrorResponse } from '@angular/common/http';
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
        if(error instanceof HttpErrorResponse) {
          if(error.status === 404){
            alert('Error al iniciar sesión, posiblemente debido a un error de las credenciales o el usuario esta '
            + 'bloqueado por multiples reportes.');
          }
        }
        this.credenciales = true;
      });
    } else {
      this.xhttp.onreadystatechange = () => {
          if (this.xhttp.readyState === 4 && this.xhttp.status === 200) {
             if(this.xhttp.responseText === '[0]'){
               this.credenciales = true;
             } else {
               formData.append('codigo', this.codigo);
               formData.append('Accept', 'application/json');
               this.userService.loginSiiau(formData).subscribe((data: any) => {
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
                   this.userService.loginSiiau(formData).subscribe((data2: any) => {
                   this.sesion = data2;
                   this.userService.setToken('sesion', this.sesion.token);
                   this.userService.setToken('user', JSON.stringify(this.sesion.user));
                   this.router.navigate(['tabs/inicio']);
                   });
                 }
               });
             }
          }
      };
      this.xhttp.open('GET', 'https://siiauec.000webhostapp.com/VerUsuario.php?codigo=' + this.codigo + '&nip='+this.password, true);
      this.xhttp.send();
    }
  }

  ngOnInit() {}

}
