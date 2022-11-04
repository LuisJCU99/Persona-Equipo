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
import { PopupUsuariosCaixaComponent } from './popup-usuarios-caixa/popup-usuarios-caixa.component';
import { Usuario_Caixa } from 'src/app/lib/models/recursos/usuario-caixa';

@Component({
  selector: 'app-usuarios-caixa',
  templateUrl: './usuarios-caixa.component.html',
  styleUrls: ['./usuarios-caixa.component.css']
})
export class UsuariosCaixaComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  caixaData!: Usuario_Caixa[];
  finalData: any;

  ngOnInit(): void {
    this.loadCaixa();
  }

  displayColumns: string[] = ["id", "usuario_caixa", "dc_us_caixa", "idEmpresa", "idTrabajador", "action"];

  openPopup(id: any) {
    const popup =
      this.dialog.open(PopupUsuariosCaixaComponent, {
        //width: '100%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        //necesito el id
        data: {
          id: id
        }
      });
    popup.afterClosed().subscribe(r => {
      this.loadCaixa();
    })
  }

  loadCaixa() {
    this.api.getAllUsuarios_Caixa().subscribe(response => {
      this.caixaData = response;
      this.finalData = new MatTableDataSource<Usuario_Caixa>(this.caixaData);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
    })
  }

  editCaixa(id: any) {
    this.openPopup(id);
  }

  deleteCaixa(id: any) {
    alertifyjs.confirm("Eliminar", "¿Estás seguro de que deseas borrar el siguiente elemento?", () => {
      this.api.deleteUsuario_CaixaById(id).subscribe(r => {
        this.loadCaixa();
      });
    }, function () {
    })
  }
}
