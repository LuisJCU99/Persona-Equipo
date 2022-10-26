import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PuestosComponent } from './proyectos/puestos/puestos.component';
import { RecursosComponent } from './recursos/recursos.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';


const routes: Routes = [
  { path: '', component: EmpresaComponent  },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'trabajadores', component: TrabajadoresComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'proyectos/:id', component: PuestosComponent },


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
