import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Puesto } from '../../lib/models/Puesto';
import { ApiService } from '../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PopupPuestosComponent } from './popup-puestos/popup-puestos.component';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/lib/models/proyecto';
import { PasarProyectoService } from 'src/app/lib/services/pasar-proyecto.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService, private router: Router, public pasarProyecto: PasarProyectoService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  puestos!: Puesto[];
  puestosByProyecto: Array<Puesto> = [];
  finalData: any;


  ngOnInit(): void {
    this.loadPuesto();

  }

  displayColumns: string[] = ["id", "tecnologia", "funcion", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupPuestosComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadPuesto();
    })
  }

  // Función que pinta los diferentes puestos filtrados por proyecto comparando el id del Proyecto.
  loadPuesto() {
    this.api.getAllPuestos().subscribe(response => {
      this.puestosByProyecto = [];
      this.puestos = response;

      for (var puesto of this.puestos) {
        if (this.pasarProyecto.proyecto.id == puesto.idProyecto) {
          this.puestosByProyecto.push(puesto);
          console.log('yo por ahi no paso')
        }
      }
      //this.finalData = new MatTableDataSource<Puesto>(this.puestos);
      this.finalData = new MatTableDataSource<Puesto>(this.puestosByProyecto);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;

    })
  }

  editPuesto(id: any) {
    this.openPopup(id);
  }

  deletePuesto(id: any) {
    alertifyjs.confirm("Eliminar", "¿Estás seguro de que deseas borrar el siguiente elemento?", () => {
      this.api.deletePuestoById(id).subscribe(r => {
        this.loadPuesto();
      });
    }, function () {
    })
  }

}
