import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from "../models/empresa";
import { Proyecto } from '../models/proyecto';
import { Puesto } from '../models/puesto';
import { Trabajador } from '../models/trabajador';
import { Ordenador } from '../models/recursos/ordenador';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000';

  //EMPRESAS
  getAllEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl + '/empresa');
  }
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

  //TRABAJADORES 
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

  //PROYECTOS
  getAllProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl + '/proyecto');
  }
  createProyecto(proyectoData: any) {
    return this.http.post(this.apiUrl + '/proyecto', proyectoData)
  }
  getProyectoById(id: any): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl + '/proyecto' + '/' + id);
  }
  deleteProyectoById(id: any) {
    return this.http.delete(this.apiUrl + '/proyecto' + '/' + id);
  }
  updateProyecto(id: any, proyectoData: any) {
    return this.http.put(this.apiUrl + '/proyecto' + '/' + id, proyectoData)
  }

  //PUESTOS
  getAllPuestos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.apiUrl + '/puesto');
  }
  createPuesto(puestoData: any) {
    return this.http.post(this.apiUrl + '/puesto', puestoData)
  }
  getPuestoById(id: any): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.apiUrl + '/puesto' + '/' + id);
  }
  deletePuestoById(id: any) {
    return this.http.delete(this.apiUrl + '/puesto' + '/' + id);
  }
  updatePuesto(id: any, puestoData: any) {
    return this.http.put(this.apiUrl + '/puesto' + '/' + id, puestoData)
  }

  //ORDENADORES
  getAllOrdenadores(): Observable<Ordenador[]> {
    return this.http.get<Ordenador[]>(this.apiUrl + '/ordenador');
  }
  createOrdenador(ordenadorData: any) {
    return this.http.post(this.apiUrl + '/ordenador', ordenadorData)
  }
  getOrdenadorById(id: any): Observable<Ordenador[]> {
    return this.http.get<Ordenador[]>(this.apiUrl + '/ordenador' + '/' + id);
  }
  deleteOrdenadorById(id: any) {
    return this.http.delete(this.apiUrl + '/ordenador' + '/' + id);
  }
  updateOrdenador(id: any, ordenadorData: any) {
    return this.http.put(this.apiUrl + '/ordenador' + '/' + id, ordenadorData)
  }
}

