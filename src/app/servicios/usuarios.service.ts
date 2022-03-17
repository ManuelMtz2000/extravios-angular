import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_ENDPOINT = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  nuevoUsuario(formData: FormData){
    return this.httpClient.post(API_ENDPOINT + '/users', formData);
  }
}
