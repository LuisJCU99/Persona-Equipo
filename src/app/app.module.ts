import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { PopupAsignarEmpresaComponent } from './trabajadores/popup-asignar-empresa/popup-asignar-empresa.component';
import { PopupProyectosComponent } from './proyectos/popup-proyectos/popup-proyectos.component';
import { PuestosComponent } from './proyectos/puestos/puestos.component';
import { PopupPuestosComponent } from './proyectos/puestos/popup-puestos/popup-puestos.component';
import { OrdenadoresComponent } from './recursos/ordenadores/ordenadores.component';
import { SmartphonesComponent } from './recursos/smartphones/smartphones.component';
import { ExtensionesComponent } from './recursos/extensiones/extensiones.component';
import { UsuariosCaixaComponent } from './recursos/usuarios-caixa/usuarios-caixa.component';
import { PopupOrdenadoresComponent } from './recursos/ordenadores/popup-ordenadores/popup-ordenadores.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://127.0.0.1:8580',
        realm: 'Gestion-AdFinPlus-1.0',
        clientId: 'gestion-adfinplus',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    PopupComponent,
    TrabajadoresComponent,
    ProyectosComponent,
    RecursosComponent,
    PopupTrabajadoresComponent,
    PopupAsignarEmpresaComponent,
    PopupProyectosComponent,
    PuestosComponent,
    PopupPuestosComponent,
    OrdenadoresComponent,
    SmartphonesComponent,
    ExtensionesComponent,
    UsuariosCaixaComponent,
    PopupOrdenadoresComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule

  ],
  providers: [ {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
