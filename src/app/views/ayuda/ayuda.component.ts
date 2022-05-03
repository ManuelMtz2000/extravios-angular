import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ayuda } from 'src/app/interfaces/Ayuda';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { AyudaService } from 'src/app/servicios/ayuda.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss'],
})
export class AyudaComponent implements OnInit {
  usuario !: Usuario;
  ayuda: Ayuda[] = [];
  constructor(private router: Router, private ayudaService: AyudaService) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    } else {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      if(this.usuario.verificado === null){
        this.router.navigate(['/registro/verificar']);
      }
    }
   }

  ngOnInit() {
    this.ayudaService.getAyuda().subscribe((data: any) => {
      this.ayuda = data;
      console.log(this.ayuda);
    });
  }

}
