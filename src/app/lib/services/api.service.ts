import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from "../models/empresa";
import { Trabajador } from '../models/trabajador';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000';

  //Hace un return que me da objetos de tipo Empresa, cogidos de la url this.apiUrl
  getAllEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl + '/empresa');
  }
  //Función a la que le paso datos de tipo Empresa, para hacer un return en el que hago POST(url de la api, dato que posteo) 
  createEmpresa(empresaData: any) {
    return this.http.post(this.apiUrl + '/empresa', empresaData)
  }
  getEmpresaById(id: any): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl + '/empresa' + '/' + id);
  }
  deleteEmpresaById(id: any) {
    return this.http.delete(this.apiUrl + '/empresa' + '/' + id);
  }
  updateEmpresa(id: any, empresaData: any) {
    return this.http.put(this.apiUrl + '/empresa' + '/' + id, empresaData)
  }

  
  getAllTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.apiUrl + '/trabajador');
  }
  createTrabajador(trabajadorData: any) {
    return this.http.post(this.apiUrl + '/trabajador', trabajadorData)
  }
  getTrabajadorById(id: any): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.apiUrl + '/trabajador' + '/' + id);
  }
  deleteTrabajadorById(id: any) {
    return this.http.delete(this.apiUrl + '/trabajador' + '/' + id);
  }
  updateTrabajador(id: any, trabajadorData: any) {
    return this.http.put(this.apiUrl + '/trabajador' + '/' + id, trabajadorData)
  }


}

