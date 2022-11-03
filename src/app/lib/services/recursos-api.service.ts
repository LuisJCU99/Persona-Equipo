import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ordenador } from '../models/recursos/ordenador';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecursosApiService {

  constructor(private http: HttpClient) { }


  apiUrl = 'http://localhost:3000/recursos';

  //Hace un return que me da objetos de tipo Empresa, cogidos de la url this.apiUrl
  getAllEmpresas(): Observable<Ordenador[]> {
    return this.http.get<Ordenador[]>(this.apiUrl + '/recursos/ordenador');
  }
  //Función a la que le paso datos de tipo Empresa, para hacer un return en el que hago POST(url de la api, dato que posteo) 
  createEmpresa(ordenadorData: any) {
    return this.http.post(this.apiUrl + '/recursos/ordenador', ordenadorData)
  }
  getEmpresaById(id: any): Observable<Ordenador[]> {
    return this.http.get<Ordenador[]>(this.apiUrl + '/recursos/ordenador' + '/' + id);
  }
  deleteEmpresaById(id: any) {
    return this.http.delete(this.apiUrl + '/recursos/ordenador' + '/' + id);
  }
  updateEmpresa(id: any, ordenadorData: any) {
    return this.http.put(this.apiUrl + '/recursos/ordenador' + '/' + id, ordenadorData)
  }

}
