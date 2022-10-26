import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup-puestos',
  templateUrl: './popup-puestos.component.html',
  styleUrls: ['./popup-puestos.component.css']
})
export class PopupPuestosComponent implements OnInit {
  editData: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.getPuestoById(this.data.id).subscribe(response => {
        this.editData = response;
        this.puestoForm.setValue({ id: this.editData.id, nombre: this.editData.nombre })
      });
    }
  }
  puestoForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    nombre: this.builder.control('', Validators.required)
  });

  savePuesto() {
    if (this.puestoForm.valid) {
      const editid = this.puestoForm.getRawValue().id;
      if (editid != '' && editid != null) {
        this.api.updatePuesto(editid, this.puestoForm.getRawValue()).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Actualizado con éxito!")
        });
      } else {
        this.api.createPuesto(this.puestoForm.value).subscribe(response => {
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
