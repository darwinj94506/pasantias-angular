import {NgModule} from '@angular/core';
import{ComponentesAngularMaterialModule} from './../componentes-angular-material/componentes-angular-material.module';
import { ModalCrearTipoComponent } from './modal-crear-tipo/modal-crear-tipo.component';


@NgModule({
    imports:[
        ComponentesAngularMaterialModule
    ],
    entryComponents:[
        ModalCrearTipoComponent
    ],

    exports: [
    ModalCrearTipoComponent
  ],
  declarations: [ModalCrearTipoComponent]
})
export class ComponentesPersonalizadosModule {}
