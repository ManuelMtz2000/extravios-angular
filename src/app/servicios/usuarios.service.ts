import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const API_ENDPOINT = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  login(formData: FormData){
    return this.httpClient.post(API_ENDPOINT + '/auth/login', formData);
  }

  nuevoUsuario(formData: FormData){
    return this.httpClient.post(API_ENDPOINT + '/users', formData);
  }

  setToken(nombre: string,token: string) {
    localStorage.setItem(nombre, token);
  }

  getToken(token: string) {
    return localStorage.getItem(token);
  }

  deleteToken(){
    localStorage.removeItem('sesion');
    localStorage.removeItem('user');
  }

  getUsuario(id: number) {
    return this.httpClient.get(API_ENDPOINT + '/users/' + id);
  }

  nuevaContra(formData: FormData, id: number){
    return this.httpClient.post(API_ENDPOINT + '/users/update/contrasenia/' + id, formData);
  }
}
