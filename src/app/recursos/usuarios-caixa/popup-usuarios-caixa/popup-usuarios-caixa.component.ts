import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup-usuarios-caixa',
  templateUrl: './popup-usuarios-caixa.component.html',
  styleUrls: ['./popup-usuarios-caixa.component.css']
})
export class PopupUsuariosCaixaComponent implements OnInit {
  editData: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.id != '' && this.data.id != null) {
      this.api.getUsuario_CaixaById(this.data.id).subscribe(response => {
        this.editData = response;
        this.caixaForm.setValue({
          id: this.editData.id,
          usuario_caixa: this.editData.usuario_caixa,
          dc_us_caixa: this.editData.dc_us_caixa,
          idEmpresa: this.editData.idEmpresa,
          idTrabajador: this.editData.idTrabajador
        })
      });
    }
  }
  caixaForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    usuario_caixa: this.builder.control('', Validators.required),
    dc_us_caixa: this.builder.control('', Validators.required),
    idEmpresa: this.builder.control('', Validators.required),
    idTrabajador: this.builder.control('', Validators.required),


  });

  saveCaixa() {
    if (this.caixaForm.valid) {
      const editid = this.caixaForm.getRawValue().id;
      if (editid != '' && editid != null) {
        this.api.updateUsuario_Caixa(editid, this.caixaForm.getRawValue()).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Actualizado con éxito!")
        });
      } else {
        this.api.createUsuario_Caixa(this.caixaForm.value).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Los cambios se han guardado con éxito!")
        });
      }

    }
  }

  closePopup() {
    this.dialog.closeAll();

  }
}
