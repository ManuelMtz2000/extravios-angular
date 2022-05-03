import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-modal-reclamar',
  templateUrl: './modal-reclamar.component.html',
  styleUrls: ['./modal-reclamar.component.scss'],
})
export class ModalReclamarComponent implements OnInit {
  @Input() publicacion !: Publicacion;
  show = false;
  mensaje !: string;
  usuario !: Usuario;
  bandera = true;
  constructor(private publicacionesService: PublicacionesService) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(this.usuario?.id === this.publicacion?.idAutor) {
      this.bandera = false;
    }
  }

  reclamar(){
    const formData = new FormData();
    formData.append('publicacion', this.publicacion?.id.toString());
    formData.append('mensaje', this.mensaje);
    formData.append('id', this.usuario?.id.toString());
    this.publicacionesService.reclamarPublicacion(formData).subscribe((data: any) => {
      alert('El autor de la publicación ha sido notificado. Revisa tu correo electrónico para consultar tu folio y seguir indicaciones.');
    }, (error) => {
      alert('Ya haz enviado correo a esta publicación, espera la respuesta.');
    });
  }

}
