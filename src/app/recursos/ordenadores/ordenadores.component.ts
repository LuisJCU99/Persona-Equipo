import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ordenador } from '../../lib/models/recursos/ordenador';
import { ApiService } from '../../lib/services/api.service';
import { PopupComponent } from '../../empresa/popup/popup.component';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PopupOrdenadoresComponent } from './popup-ordenadores/popup-ordenadores.component';

@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrls: ['./ordenadores.component.css']
})
export class OrdenadoresComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  ordenadorData!: Ordenador[];
  finalData: any;

  ngOnInit(): void {
    this.loadOrdenador();
  }

  displayColumns: string[] = ["id", "idOrdenador", "marca", "modelo", "procesador", "ram", "espacio", "ip_fija_oficina", "idEmpresa", "idTrabajador", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupOrdenadoresComponent, {
        //width: '100%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadOrdenador();
    })
  }

  loadOrdenador() {
    this.api.getAllOrdenadores().subscribe(response => {
      this.ordenadorData = response;
      this.finalData = new MatTableDataSource<Ordenador>(this.ordenadorData);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
    })
  }

  editOrdenador(id: any) {
    this.openPopup(id);
  }

  deleteOrdenador(id: any) {
    alertifyjs.confirm("Eliminar", "¿Estás seguro de que deseas borrar el siguiente elemento?", () => {
      this.api.deleteOrdenadorById(id).subscribe(r => {
        this.loadOrdenador();
      });
    }, function () {
    })
  }
}
