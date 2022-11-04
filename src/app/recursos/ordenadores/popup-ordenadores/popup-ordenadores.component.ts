import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup-ordenadores',
  templateUrl: './popup-ordenadores.component.html',
  styleUrls: ['./popup-ordenadores.component.css']
})
export class PopupOrdenadoresComponent implements OnInit {
  editData: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.id != '' && this.data.id != null) {
      this.api.getOrdenadorById(this.data.id).subscribe(response => {
        this.editData = response;
        this.ordenadorForm.setValue({
          id: this.editData.id,
          idOrdenador: this.editData.idOrdenador,
          marca: this.editData.marca,
          modelo: this.editData.modelo,
          procesador: this.editData.procesador,
          ram: this.editData.ram,
          espacio: this.editData.espacio,
          ip_fija_oficina: this.editData.ip_fija_oficina,
          idEmpresa: this.editData.idEmpresa,
          idTrabajador: this.editData.idTrabajador
        })
      });
    }
  }
  ordenadorForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    idOrdenador: this.builder.control('', Validators.required),
    marca: this.builder.control('', Validators.required),
    modelo: this.builder.control('', Validators.required),
    procesador: this.builder.control('', Validators.required),
    ram: this.builder.control('', Validators.required),
    espacio: this.builder.control('', Validators.required),
    ip_fija_oficina: this.builder.control('', Validators.required),
    idEmpresa: this.builder.control('', Validators.required),
    idTrabajador: this.builder.control('', Validators.required),


  });

  saveOrdenador() {
    if (this.ordenadorForm.valid) {
      const editid = this.ordenadorForm.getRawValue().id;
      if (editid != '' && editid != null) {
        this.api.updateOrdenador(editid, this.ordenadorForm.getRawValue()).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Actualizado con éxito!")
        });
      } else {
        this.api.createOrdenador(this.ordenadorForm.value).subscribe(response => {
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
