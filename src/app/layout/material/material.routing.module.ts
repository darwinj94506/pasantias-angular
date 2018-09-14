import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TipoMaterialComponent } from './tipo-material/tipo-material.component';
//import{ListarComponent} from './listar/listar.component';
//import{CrearComponent} from './crearMaterial/crearMaterial.component';
import{MaterialComponent} from './material.component';
//import{EditarComponent} from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: MaterialComponent
    },
   
    //{
    //     path: 'editar/:id',
    //     component: EditarComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialRoutingModule {}
