import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-modal-search-r',
  templateUrl: './modal-search-r.component.html',
  styleUrls: ['./modal-search-r.component.scss'],
})
export class ModalSearchRComponent implements OnInit {
  @Input() publicacion !: Publicacion;
  show = false;
  mensaje !: string;
  usuario !: Usuario;
  constructor(private publicacionesService: PublicacionesService) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {}

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
