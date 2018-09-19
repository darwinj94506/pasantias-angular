
import { CommonModule } from '@angular/common';
import{PerfilRoutingModule} from './perfil.routing.module';
import{UserService} from '../../shared/services/usuario.service'
import{PerfilComponent} from './perfil.component'
//crear

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
    PerfilRoutingModule, 
    ComponentesAngularMaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ], entryComponents: [
    
    
  ],
  declarations: [ 
    PerfilComponent
   
    ],
  providers:[
    UserService,
  
    {
    provide:LOCALE_ID, useValue: 'es'
  }]
})
export class PerfilModule { }
