import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';
import { PasarProyectoService } from 'src/app/lib/services/pasar-proyecto.service';

@Component({
  selector: 'app-popup-puestos',
  templateUrl: './popup-puestos.component.html',
  styleUrls: ['./popup-puestos.component.css']
})
export class PopupPuestosComponent implements OnInit {
  editData: any;
  existeTrabajador!: boolean;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService, public pasarProyecto: PasarProyectoService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.api.getAllPuestos().subscribe(response => {
    })
    if (this.data.id != '' && this.data.id != null) {
      this.api.getPuestoById(this.data.id).subscribe(response => {
        this.editData = response;
        this.puestoForm.setValue({
          id: this.editData.id, tecnologia: this.editData.tecnologia, funcion: this.editData.funcion,
          idProyecto: this.editData.idProyecto, idTrabajador: this.editData.idTrabajador
        })
      });
    }
  }
  puestoForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    tecnologia: this.builder.control('', Validators.required),
    funcion: this.builder.control('', Validators.required),
    idTrabajador: this.builder.control('', Validators.required),
    idProyecto: this.builder.control(this.pasarProyecto.proyecto.id, Validators.required),


  });

  submitPuesto() {
    this.api.getAllTrabajadores().subscribe(trabajadores => {
      for (var trabajador in trabajadores) {
        console.log(trabajadores[trabajador].id);
        if (trabajadores[trabajador].id.toString() == this.puestoForm.controls.idTrabajador.value) {
          this.existeTrabajador = true;
          this.SavePuesto();
          break;
        }
      }
      !this.existeTrabajador ? alertifyjs.error("ERROR: No existen trabajadores con ese ID") : '';
    })
  }

  SavePuesto() {
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
