import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/lib/models/empresa';
import { ApiService } from 'src/app/lib/services/api.service';

@Component({
  selector: 'app-popup-asignar-empresa',
  templateUrl: './popup-asignar-empresa.component.html',
  styleUrls: ['./popup-asignar-empresa.component.css']
})
export class PopupAsignarEmpresaComponent implements OnInit {
  empresas!: Empresa[];
  selectedValue!: any[];
  nombreEmpresa!:String;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllEmpresas().subscribe(response => {
      this.empresas = response;
    })
  }

  guardar() {   
    console.log(Object(this.selectedValue)["id"]);
    this.nombreEmpresa = Object(this.selectedValue)["nombre"];
    console.log(this.nombreEmpresa);
  }
}
