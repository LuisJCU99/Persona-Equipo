import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../lib/services/api.service';
import { PopupComponent } from '../../empresa/popup/popup.component';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PopupExtensionesComponent } from './popup-extensiones/popup-extensiones.component';
import { Extension } from 'src/app/lib/models/recursos/extension';

@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styleUrls: ['./extensiones.component.css']
})
export class ExtensionesComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  extensionData!: Extension[];
  finalData: any;

  ngOnInit(): void {
    this.loadExtension();
  }

  displayColumns: string[] = ["id", "idExtension", "telefono", "ip_publica_vpn", "fecha_caducidad_vpn", "idEmpresa", "idTrabajador", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupExtensionesComponent, {
        //width: '100%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadExtension();
    })
  }

  loadExtension() {
    this.api.getAllExtensiones().subscribe(response => {
      this.extensionData = response;
      this.finalData = new MatTableDataSource<Extension>(this.extensionData);
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
        this.loadExtension();
      });
    }, function () {
    })
  }
}
