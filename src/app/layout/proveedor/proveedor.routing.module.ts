import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TipoMaterialComponent } from './tipo-material/tipo-material.component';
//import{ListarComponent} from './listar/listar.component';
//import{CrearComponent} from './crearMaterial/crearMaterial.component';
import{ProveedorComponent} from './proveedor.component';
//import{EditarComponent} from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: ProveedorComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedorRoutingModule {}
