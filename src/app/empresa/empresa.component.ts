import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Empresa } from '../lib/models/empresa';
import { ApiService } from '../lib/services/api.service';
import { PopupComponent } from './popup/popup.component';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  empresaData!: Empresa[];
  finalData: any;

  ngOnInit(): void {
    this.loadEmpresa();
  }

  displayColumns: string[] = ["id", "nombre", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadEmpresa();
    })
  }

  loadEmpresa() {
    this.api.getAllEmpresas().subscribe(response => {
      this.empresaData = response;
      this.finalData = new MatTableDataSource<Empresa>(this.empresaData);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
    })
  }

  editEmpresa(id: any) {
    this.openPopup(id);
  }

  deleteEmpresa(id: any) {
    alertifyjs.confirm("Eliminar", "¿Estás seguro de que deseas borrar el siguiente elemento?", () => {
      this.api.deleteEmpresaById(id).subscribe(r => {
        this.loadEmpresa();
      });
    }, function () {
    })
  }
}
