import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_ENDPOINT = 'http://192.168.193.13:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AyudaService {
  constructor(private httpClient: HttpClient) {

  }

  getAyuda(){
    return this.httpClient.get(API_ENDPOINT + '/ayuda');
  }
}
