import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Empresa } from '../lib/models/empresa';
import { ApiService } from '../lib/services/api.service';
import { PopupComponent } from '../popup/popup.component';



@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  empresaData!: Empresa[];

  ngOnInit(): void {
    this.loadCompany();
  }

  displayColumns: string[] = ["idEmpresa", "nombre", "action"];

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
      this.loadCompany();
    })
  }

  loadCompany() {
    this.api.getAllEmpresas().subscribe(response => {
      this.empresaData = response;
    })
  }

  editEmpresa(id: any) {
    this.openPopup(id);
  }

}
