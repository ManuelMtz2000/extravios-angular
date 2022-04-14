import { Component, OnInit, Input } from '@angular/core';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {
  @Input() titulo!: string;
  @Input() detalles!: string;
  @Input() status!: any;
  @Input() foto!: string;
  @Input() id!: any;
  @Input() idR!: any;
  folio !: string;
  ruta = '../../..';
  constructor(private publicacionesService: PublicacionesService) { }

  ngOnInit() {}

  cerrar(){
    const formData = new FormData();
    formData.append('folio', this.folio);
    formData.append('_method', 'PUT');
    this.publicacionesService.cerrarPublicacion(formData, this.id).subscribe((data: any) => {
      alert('Publicación cerrada con éxito.');
    }, (error) => {
      console.log(error);
    });
  }
}
