import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ MatDialogModule} from '@angular/material';
import{ MaterialRoutingModule} from './material.routing.module' 
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';
import{ListarComponent,ModalEliminar} from './listar/listar.component'
import{CrearComponent} from './crearMaterial/crearMaterial.component'
import{MaterialComponent} from './material.component'
import{MaterialService} from '../../shared/services/material.service'
import{ DialogOverviewComponent} from './dialogEditar/dialogEditar.component'
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
    ModalEliminar,DialogOverviewComponent, CrearComponent
  ],
  declarations: [ListarComponent,ModalEliminar,
    CrearComponent,MaterialComponent,DialogOverviewComponent],
  providers:[MaterialService,{
    provide:LOCALE_ID, useValue: 'es'
  }]
})
export class MaterialModule { }
