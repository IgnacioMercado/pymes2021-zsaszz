import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contactos } from '../models/contactos';


@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  resourceUrl: string
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'Contactos/';
    //this.resourceUrl = 'https://pymes2021.azurewebsites.net/api/contactos';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Contactos) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}