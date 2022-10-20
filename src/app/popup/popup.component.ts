import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';




@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editData: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //Si hay id en los campos del form de la ventana modal, coge la empresa seleccionada por ID, y con los datos cogidos en el response del subscribe, me los seteas en los campos del form 
    if (this.data.id != '' && this.data.id != null) {
      this.api.getEmpresaById(this.data.id).subscribe(response => {
        this.editData = response;
        this.empresaForm.setValue({ id: this.editData.id, nombre: this.editData.nombre })
      });
    }
  }
  empresaForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    nombre: this.builder.control('', Validators.required)
  });

  saveEmpresa() {
    if (this.empresaForm.valid) {
      const editid = this.empresaForm.getRawValue().id;
      if (editid != '' && editid != null) {
        this.api.updateEmpresa(editid, this.empresaForm.getRawValue()).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Actualizado con éxito!")
        });
      } else {
        this.api.createEmpresa(this.empresaForm.value).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Los cambios se han guardado con éxito!")
        });
      }

    }
  }

  closePopup() {
    this.dialog.closeAll();

  }

  /*
  getEmpresa() {
    this.api.getAllEmpresas().subscribe(response => {
      console.log(response);
    });
  }
  */
}
