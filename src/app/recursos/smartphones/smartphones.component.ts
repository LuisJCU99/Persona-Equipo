import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Smartphone } from '../../lib/models/recursos/smartphone';
import { ApiService } from '../../lib/services/api.service';
import { PopupComponent } from '../../empresa/popup/popup.component';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PopupSmartphonesComponent } from './popup-smartphones/popup-smartphones.component';

@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  smartphoneData!: Smartphone[];
  finalData: any;

  ngOnInit(): void {
    this.loadSmartphone();
  }

  displayColumns: string[] = ["id", "imei", "marca", "modelo", "idEmpresa", "idTrabajador", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupSmartphonesComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadSmartphone();
    })
  }

  loadSmartphone() {
    this.api.getAllSmartphones().subscribe(response => {
      this.smartphoneData = response;
      this.finalData = new MatTableDataSource<Smartphone>(this.smartphoneData);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
    })
  }

  editSmartphone(id: any) {
    this.openPopup(id);
  }

  deleteSmartphone(id: any) {
    alertifyjs.confirm("Eliminar", "¿Estás seguro de que deseas borrar el siguiente elemento?", () => {
      this.api.deleteSmartphoneById(id).subscribe(r => {
        this.loadSmartphone();
      });
    }, function () {
    })
  }
}
