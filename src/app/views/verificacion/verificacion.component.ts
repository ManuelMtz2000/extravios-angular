import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.scss'],
})
export class VerificacionComponent implements OnInit {
  ruta = '../../../';
  codigo !: string;
  usuario !: Usuario;
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  verificar(){
    console.log(this.usuario.id);
    const formData = new FormData();
    formData.append('codigo', this.codigo);
    formData.append('Accept', 'application/json');
    this.usuariosService.verificarUsuario(formData, this.usuario.id).subscribe((data: any) => {
      this.usuario = data;
      this.usuariosService.deleteUserToken();
      this.usuariosService.setToken('user', JSON.stringify(this.usuario));
      this.router.navigateByUrl('tabs/inicio', { skipLocationChange: true });
    }, (error) => {
      alert('Error');
      console.log(error);
    });
  }

}
