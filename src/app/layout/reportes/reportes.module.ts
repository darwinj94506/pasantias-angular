import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ MatDialogModule} from '@angular/material';
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';

import{ReportesRoutingModule} from './reportes-routing.module';
import { ReportePrincipalComponent } from './reporte-principal/reporte-principal.component';
import{ReportesService} from './../../shared/services/reportes.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
// registerLocaleData(localeEs);
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalVerReporteComponent } from './modal-ver-reporte/modal-ver-reporte.component';
@NgModule({
  imports: [
    CommonModule, 
    ComponentesAngularMaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ReportesRoutingModule,
    FlexLayoutModule
    // BrowserAnimationsModule
  ],
  declarations: [ReportePrincipalComponent, ModalVerReporteComponent],
  providers:[
    ReportesService,
    {
      provide:LOCALE_ID, useValue: 'es'
    }
  ],
  entryComponents:[
    ModalVerReporteComponent
  ]
})
export class ReportesModule {
  
 }
