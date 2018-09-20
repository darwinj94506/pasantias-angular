import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            // {
            //     path: 'charts',
            //     loadChildren: './charts/charts.module#ChartsModule'
            // },
            // {
            //     path: 'components',
            //     loadChildren:
            //         './material-components/material-components.module#MaterialComponentsModule'
            // },
            // {
            //     path: 'forms',
            //     loadChildren: './forms/forms.module#FormsModule'
            // },
            // {
            //     path: 'grid',
            //     loadChildren: './grid/grid.module#GridModule'
            // },
            // {
            //     path: 'tables',
            //     loadChildren: './tables/tables.module#TablesModule'
            // },
            {
                path: 'blank-page',
                loadChildren: './blank-page/blank-page.module#BlankPageModule'
            },
            {
                path: 'modulo-usuario',
                loadChildren: './usuario/usuario.module#UsuarioModule'
            },

            {
                path: 'modulo-tipo',
                loadChildren: './tipo-material/tipo-material.module#TipoMaterialModule'
            }, 
            {
                path: 'modulo-material',
                loadChildren: './material/material.module#MaterialModule'
            },
            {
                path: 'modulo-proveedor',
                loadChildren: './proveedor/proveedor.module#ProveedorModule'
            },
            {
                path: 'modulo-garantia',
                loadChildren: './garantia/garantia.module#GarantiaModule'
            },
            {
                path: 'modulo-ingresos',
                loadChildren: './ingreso/ingreso.module#IngresoModule'
            },
             {
                path: 'modulo-egresos',
                loadChildren: './egreso/egreso.module#EgresoModule'
            },
            {
                path: 'perfil',
                loadChildren: './perfil/perfil.module#PerfilModule'
            },
            {
                path: 'modulo-reportes',
                loadChildren: './reportes/reportes.module#ReportesModule'
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
