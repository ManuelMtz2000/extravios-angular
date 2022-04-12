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
      alert('Se envió un correo electrónico al autor de la publicación.');
    });
  }

}
