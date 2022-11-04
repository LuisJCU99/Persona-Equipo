import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup-extensiones',
  templateUrl: './popup-extensiones.component.html',
  styleUrls: ['./popup-extensiones.component.css']
})
export class PopupExtensionesComponent implements OnInit {
  editData: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.id != '' && this.data.id != null) {
      this.api.getExtensionById(this.data.id).subscribe(response => {
        this.editData = response;
        this.extensionForm.setValue({
          id: this.editData.id,
          idExtension: this.editData.idExtension,
          telefono: this.editData.telefono,
          ip_publica_vpn: this.editData.ip_publica_vpn,
          fecha_caducidad_vpn: this.editData.fecha_caducidad_vpn,
          idEmpresa: this.editData.idEmpresa,
          idTrabajador: this.editData.idTrabajador
        })
      });
    }
  }
  extensionForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    idExtension: this.builder.control('', Validators.required),
    telefono: this.builder.control('', Validators.required),
    ip_publica_vpn: this.builder.control('', Validators.required),
    fecha_caducidad_vpn: this.builder.control('', Validators.required),
    idEmpresa: this.builder.control('', Validators.required),
    idTrabajador: this.builder.control('', Validators.required),
  });

  saveExtension() {
    if (this.extensionForm.valid) {
      const editid = this.extensionForm.getRawValue().id;
      if (editid != '' && editid != null) {
        this.api.updateExtension(editid, this.extensionForm.getRawValue()).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Actualizado con éxito!")
        });
      } else {
        this.api.createExtension(this.extensionForm.value).subscribe(response => {
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
