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

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  puestoData!: Puesto[];
  finalData: any;

  ngOnInit(): void {
    this.loadPuesto();
  }

  displayColumns: string[] = ["id", "tecnologia", "action"];

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

  loadPuesto() {
    this.api.getAllPuestos().subscribe(response => {
      this.puestoData = response;
      this.finalData = new MatTableDataSource<Puesto>(this.puestoData);
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
