
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent, ModalEliminar } from './listar-usuario/listar-usuario.component';
import{UsuarioRoutingModule} from './usuario-routing.module';
import{UserService} from '../../shared/services/usuario.service'
import{ UsuarioComponent} from './usuario.component'
//crear
import{ CrearUsuarioComponent} from './crear-usuario/crear-usurio.component'
//buscar
import{BuscarUsuarioComponent} from './buscar-usuario/buscar-usuario.component'
//editar
import{ EditarUsuarioComponent} from './editar-usuario/editar-usuario.component'
//componentes
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { NgModule,LOCALE_ID } from '@angular/core';
import{ MatDialogModule} from '@angular/material';
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';
// registerLocaleData(localeEs);
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule, 
    UsuarioRoutingModule, 
    ComponentesAngularMaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ], entryComponents: [
    ModalEliminar, CrearUsuarioComponent,BuscarUsuarioComponent,
    EditarUsuarioComponent
    
  ],
  declarations: [ 
    EditarUsuarioComponent,
    ListarUsuarioComponent, ModalEliminar,UsuarioComponent, CrearUsuarioComponent,BuscarUsuarioComponent
    ],
  providers:[
    UserService,
  
    {
    provide:LOCALE_ID, useValue: 'es'
  }]
})
export class UsuarioModule { }
