import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const API_ENDPOINT = 'http://192.168.193.13:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  login(formData: FormData){
    return this.httpClient.post(API_ENDPOINT + '/auth/login', formData);
  }

  loginSiiau(formData: FormData){
    return this.httpClient.post(API_ENDPOINT + '/auth/login/siiau', formData);
  }

  verificarSiiau(codigo: FormData){
    return this.httpClient.post(API_ENDPOINT + '/auth/login/siiau/verificar', codigo);
  }

  nuevoUsuario(formData: FormData){
    return this.httpClient.post(API_ENDPOINT + '/users', formData);
  }

  verificarUsuario(formData: FormData, id: number){
    return this.httpClient.post(API_ENDPOINT + '/users/verificar/' + id, formData);
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

  deleteUserToken(){
    localStorage.removeItem('user');
  }

  getUsuario(id: number) {
    return this.httpClient.get(API_ENDPOINT + '/users/' + id);
  }

  nuevaContra(formData: FormData, id: number){
    return this.httpClient.post(API_ENDPOINT + '/users/update/contrasenia/' + id, formData);
  }

  nuevosDatos(formData: FormData, id: number){
    return this.httpClient.post(API_ENDPOINT + '/users/update/datos/' + id, formData);
  }

  nuevaFoto(formData: FormData, id: number){
    return this.httpClient.post(API_ENDPOINT + '/users/update/foto/' + id, formData);
  }
}
