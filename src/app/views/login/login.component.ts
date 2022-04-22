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
    const currentRoute = 'tabs/inicio';
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
          this.router.navigateByUrl('tabs/inicio', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentRoute]);
          });
        } else {
          this.router.navigateByUrl('registro/verificar', { skipLocationChange: true });
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
               formData.append('contra1', JSON.parse(this.xhttp.responseText)[0].nip);
               formData.append('contra2', this.password);
               formData.append('codigo', this.codigo);
               this.userService.loginSiiau(formData).subscribe((data: any) => {
                 this.sesion = {token: data, user: this.estudiante};
                 this.userService.setToken('sesion', this.sesion.token);
                this.userService.setToken('user', JSON.stringify(this.sesion.user));
                this.correo = '';
                this.password = '';
                this.credenciales = false;
                this.router.navigateByUrl('tabs/inicio', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentRoute]);
                });
               }, (error) => {
                  this.credenciales = true;
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
