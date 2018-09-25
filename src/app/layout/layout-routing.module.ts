import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{RolUserGuard} from '../shared/guard/rolUser.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'modulo-material'
            },
            
            {
                path: 'modulo-usuario',
                loadChildren: './usuario/usuario.module#UsuarioModule',canActivate:[RolUserGuard]
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
    exports: [RouterModule],
    providers: [RolUserGuard]

})
export class LayoutRoutingModule {}

