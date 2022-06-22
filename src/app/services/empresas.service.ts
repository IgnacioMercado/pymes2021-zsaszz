import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Empresas } from '../models/empresas';

@Injectable()
export class EmpresasService {
  resourceUrl: string;


  constructor(private httpClient: HttpClient) { 
    this.resourceUrl = environment.ConexionWebApiProxy + 'Empresas/';
    //this.resourceUrl = 'https://pymes2021.azurewebsites.net/api/empresas'
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getById(Id: number){
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj: Empresas) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(obj: Empresas, Id: number){
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id: number){
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}