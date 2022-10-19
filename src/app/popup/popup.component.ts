import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../lib/services/api.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
  }
  empresaForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    nombre: this.builder.control('', Validators.required)
  });

  saveEmpresa() {
    if (this.empresaForm.valid) {
      this.api.createEmpresa(this.empresaForm.value).subscribe(response => {
        alert("guardado correctamente");
        console.log(response);
      });
    }
  }

  closePopup(){
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
