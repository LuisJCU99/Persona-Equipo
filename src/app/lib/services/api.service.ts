import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Empresa } from "../models/empresa";
import { Proyecto } from '../models/proyecto';
import { Puesto } from '../models/puesto';
import { Trabajador } from '../models/trabajador';

import { Ordenador } from '../models/recursos/ordenador';
import { Smartphone } from '../models/recursos/smartphone';
import { Extension } from '../models/recursos/extension';
import { Usuario_Caixa } from '../models/recursos/usuario-caixa';



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

  //---------------------------------------------RECURSOS-------------------------------------------
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

  //SMARTPHONES
  getAllSmartphones(): Observable<Smartphone[]> {
    return this.http.get<Smartphone[]>(this.apiUrl + '/smartphone');
  }
  createSmartphone(smartphoneData: any) {
    return this.http.post(this.apiUrl + '/smartphone', smartphoneData)
  }
  getSmartphoneById(id: any): Observable<Smartphone[]> {
    return this.http.get<Smartphone[]>(this.apiUrl + '/smartphone' + '/' + id);
  }
  deleteSmartphoneById(id: any) {
    return this.http.delete(this.apiUrl + '/smartphone' + '/' + id);
  }
  updateSmartphone(id: any, smartphoneData: any) {
    return this.http.put(this.apiUrl + '/smartphone' + '/' + id, smartphoneData)
  }

  //EXTENSIONES
  getAllExtensiones(): Observable<Extension[]> {
    return this.http.get<Extension[]>(this.apiUrl + '/extension');
  }
  createExtension(extensionData: any) {
    return this.http.post(this.apiUrl + '/extension', extensionData)
  }
  getExtensionById(id: any): Observable<Extension[]> {
    return this.http.get<Extension[]>(this.apiUrl + '/extension' + '/' + id);
  }
  deleteExtensionById(id: any) {
    return this.http.delete(this.apiUrl + '/extension' + '/' + id);
  }
  updateExtension(id: any, extensionData: any) {
    return this.http.put(this.apiUrl + '/extension' + '/' + id, extensionData)
  }

  //USUARIOS DE CAIXA 
  getAllUsuarios_Caixa(): Observable<Usuario_Caixa[]> {
    return this.http.get<Usuario_Caixa[]>(this.apiUrl + '/caixa');
  }
  createUsuario_Caixa(usuario_caixaData: any) {
    return this.http.post(this.apiUrl + '/caixa', usuario_caixaData)
  }
  getUsuario_CaixaById(id: any): Observable<Usuario_Caixa[]> {
    return this.http.get<Usuario_Caixa[]>(this.apiUrl + '/caixa' + '/' + id);
  }
  deleteUsuario_CaixaById(id: any) {
    return this.http.delete(this.apiUrl + '/caixa' + '/' + id);
  }
  updateUsuario_Caixa(id: any, usuario_caixaData: any) {
    return this.http.put(this.apiUrl + '/caixa' + '/' + id, usuario_caixaData)
  }
}

