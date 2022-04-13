import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  bandera = true;
  botonImagen = false;
  usuario !: Usuario;
  contraOld!: string;
  contraNew!: string;
  contraNew2!: string;
  file !: any;

  usuarioForm: Usuario = {
    id: 0,
    nombre: '',
    datosContacto: '',
    fotoP: '',
    correo: ''
  };

  constructor(private router: Router, private userService: UsuariosService) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    }
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.userService.getUsuario(this.usuario?.id).subscribe((data: any) => {
      this.usuario = data;
      this.usuarioForm.datosContacto = this.usuario.datosContacto;
      console.log(this.usuario.fotoP);
    });
   }

   cambiarFoto(fileInput: any){
     this.file = fileInput.target.files[0];
     const formData = new FormData();
     formData.append('imagen', this.file);
     formData.append('_method', 'PUT');
     formData.append('Content-Type', 'multipart/form-data');
     this.userService.nuevaFoto(formData, this.usuario.id).subscribe((data: any) => {
       alert('Foto modificada');
      console.log(data);
       this.ngOnInit();
     }, (error) => {
       console.log(error);
     });
   }

   guardarDatos(){
     const formData = new FormData();
     formData.append('datos', this.usuarioForm.datosContacto);
     formData.append('_method', 'PUT');
     this.userService.nuevosDatos(formData, this.usuario.id).subscribe((data: any) => {
       alert('Modificado');
     });
   }

   guardarContrasenia(){
     if(this.contraNew === this.contraNew2){
       const formData = new FormData();
       formData.append('contraOld', this.contraOld);
       formData.append('contraNew', this.contraNew);
       formData.append('contraNew2', this.contraNew2);
       formData.append('_method', 'PUT');
       this.userService.nuevaContra(formData, this.usuario.id).subscribe((data: any) => {
         alert('Modificado');
       }, (error) => {
         alert('La contraseña original no coincide.');
       });
     } else {
       alert('La contraseña no coincide.');
     }
   }

}
