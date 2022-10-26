import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup-proyectos',
  templateUrl: './popup-proyectos.component.html',
  styleUrls: ['./popup-proyectos.component.css']
})
export class PopupProyectosComponent implements OnInit {
  editData: any;
  existeEmpresa: boolean = false;

  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.getProyectoById(this.data.id).subscribe(response => {
        this.editData = response;
        this.proyectoForm.setValue({ id: this.editData.id, nombre: this.editData.nombre, idEmpresa: this.editData.idEmpresa })
      });
    }
  }
  proyectoForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    nombre: this.builder.control('', Validators.required),
    idEmpresa: this.builder.control({ value: '', disabled: false }),

  });

  submitProyecto() {
    this.api.getAllEmpresas().subscribe(empresas => {
      for (var empresa in empresas) {
        console.log(empresas[empresa].id);
        if (empresas[empresa].id.toString() == this.proyectoForm.controls.idEmpresa.value) {
          this.existeEmpresa = true;
          this.saveProyecto();
          break;
        }
      }
      !this.existeEmpresa? alertifyjs.error("ERROR: No existen empresas con ese ID"): '';
    })
}

  saveProyecto() {
    if (this.proyectoForm.valid) {
      const editid = this.proyectoForm.getRawValue().id;
      if (editid != '' && editid != null) {
        this.api.updateProyecto(editid, this.proyectoForm.getRawValue()).subscribe(response => {
          this.closePopup();
          alertifyjs.success("¡Actualizado con éxito!")
        });
      } else {
        this.api.createProyectos(this.proyectoForm.value).subscribe(response => {
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
