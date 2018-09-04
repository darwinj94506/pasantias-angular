import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarIngresoComponent } from './listar-ingreso/listar-ingreso.component';
import{IngresoRoutingModule} from './ingreso-routing.module'; 
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module'; 
import{IngresoService} from './../../shared/services/ingreso.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCrudIngresoComponent } from './modal-crud-ingreso/modal-crud-ingreso.component';
// import { RouterModule, Routes } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    ComponentesAngularMaterialModule,
    IngresoRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  entryComponents: [
    ModalCrudIngresoComponent
  ],
  providers:[IngresoService,{
    provide:LOCALE_ID, useValue: 'es'
  }],
  declarations: [ListarIngresoComponent, ModalCrudIngresoComponent]
})
export class IngresoModule { }
