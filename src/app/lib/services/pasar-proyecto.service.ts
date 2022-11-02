import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class PasarProyectoService {

  proyecto!: Proyecto

  constructor() { }
}
