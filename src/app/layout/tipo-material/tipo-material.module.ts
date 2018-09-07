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
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
import{ComponentesPersonalizadosModule} from './../componentes-personalizados/componentes-personalizados.module';
import { ModalCrearComponent } from './modal-crear/modal-crear.component';
import { ModalEditarTipoComponent } from './modal-editar-tipo/modal-editar-tipo.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentesAngularMaterialModule,
    TipoMaterialRoutingModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentesPersonalizadosModule
    // RouterModule
  ],
  entryComponents: [
    Modal,ModalEliminar,ModalEditar,ModalCrearComponent
  ],
  providers:[TipoMaterialService,{
    provide:LOCALE_ID, useValue: 'es'
  }],
  declarations: [CrearComponent,
      ListarComponent,    
      Modal,ModalEditar,
      ModalEliminar,
      EditarComponent,
      ModalCrearComponent,
      ModalEditarTipoComponent]
})
export class TipoMaterialModule { }
