import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ MatDialogModule} from '@angular/material';
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';

import{ GarantiaRoutingModule} from './garantia.routing.module' 
import{ GarantiaComponent} from './garantia.component'
import{GarantiaService} from '../../shared/services/garantia.service'

//eventos
import{ListarProveedorComponent,  ModalEliminar} from './listar-garantia/listar-garantia.component'
import{CrearGarantiaComponent} from './crear-garantia/crear-garantia.component'
import{ EditarGarantiaComponent} from './editar-garantia/editar-garantia.component'
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
    GarantiaRoutingModule, 
    ComponentesAngularMaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ], entryComponents: [
    ModalEliminar,CrearGarantiaComponent, EditarGarantiaComponent
  ],
  declarations: [ ModalEliminar,ListarProveedorComponent,
    GarantiaComponent,CrearGarantiaComponent, EditarGarantiaComponent],
  providers:[GarantiaService
    ,{
    provide:LOCALE_ID, useValue: 'es'
  }]
})
export class GarantiaModule { }
