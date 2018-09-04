import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TipoMaterialComponent } from './tipo-material/tipo-material.component';
import{ListarIngresoComponent} from './listar-ingreso/listar-ingreso.component';


const routes: Routes = [
    {
        path: '',
        component: ListarIngresoComponent
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngresoRoutingModule {}
