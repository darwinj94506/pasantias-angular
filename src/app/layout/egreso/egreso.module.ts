import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarEgresoComponent } from './listar-egreso/listar-egreso.component';
import { CrudEgresoComponent } from './crud-egreso/crud-egreso.component';
import{EgresoRoutingModule} from './egreso-routing.module';
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module'; 
import{EgresoService} from './../../shared/services/egreso.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ModalCrudIngresoComponent } from './modal-crud-ingreso/modal-crud-ingreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ModalVerDetalleComponent } from './modal-ver-detalle/modal-ver-detalle.component';
@NgModule({
  imports: [
    CommonModule,
    EgresoRoutingModule,
    ComponentesAngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ], entryComponents: [
    ModalVerDetalleComponent 
  ],
  providers:[EgresoService,{
    provide:LOCALE_ID, useValue: 'es'
  }],
  declarations: [ListarEgresoComponent, CrudEgresoComponent,DetalleComponent, ModalVerDetalleComponent]
})
export class EgresoModule { }
