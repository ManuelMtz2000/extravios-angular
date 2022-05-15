import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/Publicacion';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  show = false;
  publicacion !: Publicacion;
  id !: any;
  descripcion !: string;
  usuario !: Usuario;
  constructor(private router: Router, private publicacionesService: PublicacionesService, private activatedRoute: ActivatedRoute) {
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
        this.publicacionesService.obtenerPublicacion(this.id).subscribe((data: any) => {
          this.publicacion = data;
        }, (error) => {
          console.log(error);
        });
      }
    });
  }

  reportar(){
    const formData = new FormData();
    formData.append('id', this.publicacion?.id.toString());
    formData.append('idReporta', this.usuario.id.toString());
    formData.append('descripcion', this.descripcion);
    this.publicacionesService.reportarPublicacion(formData).subscribe((data: any) => {
      this.show = false;
      alert('Reporte elaborado con correctamente.');
      this.router.navigate(['app/tabs/inicio']);
    }, (error) => {
      alert('Ocurrio un error en el reporte, es posible que sea debido a que ya reporto la publicación o no esta conectado a internet.');
    });
  }

}
