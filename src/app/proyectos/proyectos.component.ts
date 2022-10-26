import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Proyecto } from '../lib/models/proyecto';
import { ApiService } from '../lib/services/api.service';
import { PopupProyectosComponent } from './popup-proyectos/popup-proyectos.component';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  proyectoData!: Proyecto[];
  finalData: any;

  ngOnInit(): void {
    this.loadProyecto();
  }

  displayColumns: string[] = ["id", "nombre", "idEmpresa", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupProyectosComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadProyecto();
    })
  }

  loadProyecto() {
    this.api.getAllProyectos().subscribe(response => {
      this.proyectoData = response;
      this.finalData = new MatTableDataSource<Proyecto>(this.proyectoData);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
    })
  }

  editProyecto(id: any) {
    this.openPopup(id);
  }

  deleteProyecto(id: any) {
    alertifyjs.confirm("Eliminar", "¿Estás seguro de que deseas borrar el siguiente elemento?", () => {
      this.api.deleteEmpresaById(id).subscribe(r => {
        this.loadProyecto();
      });
    }, function () {
    })
  }
}
