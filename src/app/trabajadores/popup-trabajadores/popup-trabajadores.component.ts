import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../lib/services/api.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup-trabajadores',
  templateUrl: './popup-trabajadores.component.html',
  styleUrls: ['./popup-trabajadores.component.css']
})
export class PopupTrabajadoresComponent implements OnInit {
  editData: any;
  existeEmpresa: boolean = false;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //Si hay id en los campos del form de la ventana modal, coge la trabajador seleccionada por ID, y con los datos cogidos en el response del subscribe, me los seteas en los campos del form 
    if (this.data.id != '' && this.data.id != null) {
      this.api.getTrabajadorById(this.data.id).subscribe(response => {
        this.editData = response;
        this.trabajadorForm.setValue({
          id: this.editData.id, nombre: this.editData.nombre, usuario: this.editData.usuario,
          email_tnf: this.editData.email_tnf, apellidos: this.editData.apellidos, password: this.editData.password, gmail_tnf: this.editData.gmail_tnf,
          idEmpresa: this.editData.idEmpresa
        })
      });
    }
  }
  trabajadorForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    nombre: this.builder.control('', Validators.required),
    usuario: this.builder.control('', Validators.required),
    email_tnf: this.builder.control('', Validators.required),
    apellidos: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    gmail_tnf: this.builder.control('', Validators.required),
    idEmpresa: this.builder.control({ value: '', disabled: false })

  });
  submitTrabajador() {
    this.api.getAllEmpresas().subscribe(empresas => {
      for (var empresa in empresas) {
        console.log(empresas[empresa].id);
        if (empresas[empresa].id.toString() == this.trabajadorForm.controls.idEmpresa.value) {
          this.existeEmpresa = true;
          this.SaveTrabajador();
          break;
        }
      }
      !this.existeEmpresa? alertifyjs.error("ERROR: No existen empresas con ese ID"): '';
    })
}

SaveTrabajador(){
  if (this.trabajadorForm.valid) {
    const editid = this.trabajadorForm.getRawValue().id;
    if (editid != '' && editid != null) {
      this.api.updateTrabajador(editid, this.trabajadorForm.getRawValue()).subscribe(response => {
        this.closePopup();
        alertifyjs.success("¡Actualizado con éxito!")
      });
    } else {
      this.api.createTrabajador(this.trabajadorForm.value).subscribe(response => {
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
