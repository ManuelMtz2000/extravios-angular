import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/Usuarios';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  usuario!: Usuario;
  constructor(private router: Router) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    } else {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      if(this.usuario.verificado === null){
        this.router.navigate(['/registro/verificar']);
      }
    }
  }

}
