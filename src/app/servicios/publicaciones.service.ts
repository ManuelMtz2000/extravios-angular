import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from '../interfaces/Publicacion';

const API_ENDPOINT = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private httpClient: HttpClient) { }

  guardarPublicacion(publicacion: FormData){
    return this.httpClient.post(API_ENDPOINT + '/publicaciones', publicacion);
  }
}
