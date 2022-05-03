import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  contraNew = '';
  contraNew2 = '';
  file !: any;
  banderaContra = false;
  datos = '';
  id !: any;
  usuarioForm: Usuario = {
    id: 0,
    nombre: '',
    datosContacto: '',
    fotoP: '',
    correo: '',
    verificado: ''
  };

  constructor(private router: Router, private userService: UsuariosService, private activatedRoute: ActivatedRoute) {
    if(!(localStorage.getItem('sesion') && localStorage.getItem('user'))){
      this.router.navigate(['entrar']);
    } else {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      if(this.usuario.verificado === null){
        this.router.navigate(['/registro/verificar']);
      }
    }
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if(this.id){
        if(this.id !== this.usuario.id.toString()){
          this.router.navigate(['tabs/inicio']);
        } else {
            this.userService.getUsuario(this.id).subscribe((data: any) => {
            this.usuario = data;
            this.usuarioForm.datosContacto = this.usuario.datosContacto;
            this.datos = this.usuarioForm.datosContacto;
          });
        }
      }
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
     if(this.datos.length > 0) {
      formData.append('datos', this.datos);
    } else {
      formData.append('datos', ' ');
    }
     formData.append('_method', 'PUT');
     this.userService.nuevosDatos(formData, this.usuario.id).subscribe((data: any) => {
       alert('Modificado');
     });
   }

   validar(){
     let bandera = false;
     if(this.contraNew.length > 8 && this.contraNew.length <= 16){
        bandera = true;
        this.banderaContra = true;
     }
     if(this.contraNew2.length > 8 && this.contraNew2.length <= 16){
       bandera = true;
       this.banderaContra = true;
     }
     return bandera;
   }

   guardarContrasenia(){
     if(this.contraNew === this.contraNew2){
       this.banderaContra = false;
       if(this.validar()){
         return null;
       }
       const formData = new FormData();
       formData.append('contraOld', this.contraOld);
       formData.append('contraNew', this.contraNew);
       formData.append('contraNew2', this.contraNew2);
       formData.append('_method', 'PUT');
       this.userService.nuevaContra(formData, this.usuario.id).subscribe((data: any) => {
         alert('Modificado');
         this.contraOld = '';
         this.contraNew = '';
         this.contraNew2 = '';
       }, (error) => {
         if(error instanceof HttpErrorResponse){
           if(error.status === 402){
             alert('No tiene permitido cambiar la contraseña.');
           } else {
             alert('Error en la operación, puede deberse a que la contraseña original no coincide o un error en su conexión a Internet.');
           }
          }
       });
     } else {
       alert('Las contraseñas ingresadas no coinciden.');
     }
   }

}
