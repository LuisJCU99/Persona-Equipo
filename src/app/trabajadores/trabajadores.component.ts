import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Trabajador } from '../lib/models/trabajador';
import { ApiService } from '../lib/services/api.service';
import { PopupTrabajadoresComponent } from './popup-trabajadores/popup-trabajadores.component';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PopupAsignarEmpresaComponent } from './popup-asignar-empresa/popup-asignar-empresa.component';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  trabajadorData!: Trabajador[];
  finalDataTrabajadores: any;

  ngOnInit(): void {
    this.loadTrabajador();
  }

  displayColumns: string[] = ["id", "nombre", "apellidos", "usuario", "email_tnf", "password", "gmail_tnf", "idEmpresa", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupTrabajadoresComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadTrabajador();
    })
  }

  asignarEmpresaPopup(id: any) {
    //const popup =
    this.dialog.open(PopupAsignarEmpresaComponent, {
      width: '50%',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms',
      //necesito el id
      data: {
        id: id
      }
    });
  }

  loadTrabajador() {
    this.api.getAllTrabajadores().subscribe(response => {
      this.trabajadorData = response;
      this.finalDataTrabajadores = new MatTableDataSource<Trabajador>(this.trabajadorData);
      this.finalDataTrabajadores.paginator = this._paginator;
      this.finalDataTrabajadores.sort = this._sort;
    })
  }

  editTrabajador(id: any) {
    this.openPopup(id);
  }
  asignarEmpresa(id: any) {
    this.asignarEmpresaPopup(id);
  }
  deleteTrabajador(id: any) {
    alertifyjs.confirm("Eliminar", "¿Estás seguro de que deseas borrar el siguiente elemento?", () => {
      this.api.deleteTrabajadorById(id).subscribe(r => {
        this.loadTrabajador();
      });
    }, function () {
    })
  }
}
