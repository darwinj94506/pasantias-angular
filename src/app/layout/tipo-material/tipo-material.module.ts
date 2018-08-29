import { NgModule,LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';
import { CrearComponent,Modal } from './crear/crear.component';
import { ListarComponent,ModalEliminar  } from './listar/listar.component';
import { EditarComponent,ModalEditar } from './editar/editar.component';
import{TipoMaterialRoutingModule} from './tipo-material.routing.module';
import{TipoMaterialService} from './../../shared/services/tipo-material.service';

import { HttpClientModule,HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
// registerLocaleData(localeEs);
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    ComponentesAngularMaterialModule,
    TipoMaterialRoutingModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // RouterModule
  ],
  entryComponents: [
    Modal,ModalEliminar,ModalEditar
  ],
  providers:[TipoMaterialService,{
    provide:LOCALE_ID, useValue: 'es'
  }],
  declarations: [CrearComponent,
      ListarComponent,    
      Modal,ModalEditar,
      ModalEliminar,
      EditarComponent]
})
export class TipoMaterialModule { }
