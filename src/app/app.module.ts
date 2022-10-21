import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpresaComponent } from './empresa/empresa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/MaterialModule';
import { PopupComponent } from './empresa/popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { AppRoutingModule } from './app-routing.module';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { RecursosComponent } from './recursos/recursos.component';
import { PopupTrabajadoresComponent } from './trabajadores/popup-trabajadores/popup-trabajadores.component';



@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    PopupComponent,
    TrabajadoresComponent,
    ProyectosComponent,
    RecursosComponent,
    PopupTrabajadoresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
