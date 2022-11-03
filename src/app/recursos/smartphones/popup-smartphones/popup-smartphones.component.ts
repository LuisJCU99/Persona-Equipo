import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup-smartphones',
  templateUrl: './popup-smartphones.component.html',
  styleUrls: ['./popup-smartphones.component.css']
})
export class PopupSmartphonesComponent implements OnInit {
  editData: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.id != '' && this.data.id != null) {
      this.api.getSmartphoneById(this.data.id).subscribe(response => {
        this.editData = response;
        this.smartphoneForm.setValue({ id: this.editData.id, imei: this.editData.imei, marca: this.editData.marca, modelo: this.editData.modelo })
      });
    }
  }
  smartphoneForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    imei: this.builder.control('', Validators.required),
    marca: this.builder.control('', Validators.required),
    modelo: this.builder.control('', Validators.required)
  });

  saveSmartphone() {
    if (this.smartphoneForm.valid) {
      const editid = this.smartphoneForm.getRawValue().id;
      if (editid != '' && editid != null) {
        this.api.updateSmartphone(editid, this.smartphoneForm.getRawValue()).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Actualizado con éxito!")
        });
      } else {
        this.api.createSmartphone(this.smartphoneForm.value).subscribe(response => {
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
