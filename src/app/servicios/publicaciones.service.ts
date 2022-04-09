import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from '../interfaces/Publicacion';

const API_ENDPOINT = 'http://192.168.193.13:8000/api';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private httpClient: HttpClient) { }

  guardarPublicacion(publicacion: FormData){
    return this.httpClient.post(API_ENDPOINT + '/publicaciones', publicacion);
  }

  obtenerPublicaciones(){
    return this.httpClient.get(API_ENDPOINT + '/publicaciones');
  }

  obtenerPublicacion(id: any){
    return this.httpClient.get(API_ENDPOINT + '/publicaciones/' + id);
  }

  obtenerPublicacionUsuario(id: any){
    return this.httpClient.get(API_ENDPOINT + '/publicaciones/get/' + id);
  }

  reportarPublicacion(formData: FormData){
    return this.httpClient.post(API_ENDPOINT + '/publicaciones/reportar', formData);
  }
  // reportarPublicacion(id: number){
  // }
}
