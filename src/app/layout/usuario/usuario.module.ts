import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { ModalCrudUsuarioComponent } from './modal-crud-usuario/modal-crud-usuario.component';
import{UsuarioRoutingModule} from './usuario-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ],
  declarations: [ListarUsuarioComponent, ModalCrudUsuarioComponent]
})
export class UsuarioModule { }
