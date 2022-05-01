import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './interfaces/Usuarios';
import { UsuariosService } from './servicios/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user !: Usuario;
  constructor(private router: Router, private userService: UsuariosService) {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userService.verificarStatus(this.user?.id).subscribe((data: any) => { }, (error) => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 404) {
            this.userService.deleteToken();
            alert('El usuario ha sido bloqueado por multiples reportes. Para cualquier aclaración, comunicate al correo: ' +
            'extravioscucei01@gmail.com');
            this.router.navigate(['entrar']);
          }
        }
      });
    }
  }
}
