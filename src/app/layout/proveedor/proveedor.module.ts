import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ MatDialogModule} from '@angular/material';
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';

import{ ProveedorRoutingModule} from './proveedor.routing.module' ;
import{ProveedorService} from '../../shared/services/proveedor.service';
import{ProveedorComponent} from './proveedor.component';
//eventos
import{ListarProveedorComponent,ModalEliminar} from './listar-proveedor/listar-proveedor.component'
import{ CrearProveedorComponent} from './crear-proveedor/crear-proveedor.component'
import{ EditarProveedorComponent} from './editar-proveedor/editar-proveedor.component'
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
    ProveedorRoutingModule, 
    ComponentesAngularMaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ], entryComponents: [
    ModalEliminar,
    CrearProveedorComponent,
    EditarProveedorComponent
    
  ],
  declarations: [ 
    ProveedorComponent,
    ListarProveedorComponent,
    ModalEliminar,
    CrearProveedorComponent,
    EditarProveedorComponent
    ],
  providers:[
    ProveedorService,
  
    {
    provide:LOCALE_ID, useValue: 'es'
  }]
})
export class ProveedorModule { }
