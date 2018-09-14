import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TipoMaterialComponent } from './tipo-material/tipo-material.component';
import{ UsuarioComponent} from './usuario.component';
//import{CrearComponent} from './crear/crear.component';
//import{EditarComponent} from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}
