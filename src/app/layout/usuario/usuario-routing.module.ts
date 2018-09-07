import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TipoMaterialComponent } from './tipo-material/tipo-material.component';
import{ModalCrudUsuarioComponent} from './modal-crud-usuario/modal-crud-usuario.component';
//import{CrearComponent} from './crear/crear.component';
//import{EditarComponent} from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: ModalCrudUsuarioComponent
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}
