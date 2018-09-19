import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ReportePrincipalComponent} from './reporte-principal/reporte-principal.component';


const routes: Routes = [
    {
        path: '',
        component: ReportePrincipalComponent
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportesRoutingModule {}
