import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ MaterialRoutingModule} from './material.routing.module'
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';
import{ListarComponent,ModalEliminar} from './listar/listar.component'
import{MaterialService} from '../../shared/services/material.service'

//
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
// registerLocaleData(localeEs);
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//

@NgModule({
  imports: [
    CommonModule, 
    MaterialRoutingModule, 
    ComponentesAngularMaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ], entryComponents: [
    ModalEliminar
  ],
  declarations: [ListarComponent,ModalEliminar],
  providers:[MaterialService,{
    provide:LOCALE_ID, useValue: 'es'
  }]
})
export class MaterialModule { }
