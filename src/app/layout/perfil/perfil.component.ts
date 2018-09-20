import { Component, OnInit } from '@angular/core';
import{ UserService} from './../../shared/services/usuario.service';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{ActivatedRoute} from '@angular/router';
@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent { 
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    bufferValue = 50;
    myForm: FormGroup; 
    cargando=false;
    data:any;
     active = true;
     roles:any=[{
         "rol":1,
         "nombre":'Funcionario'
     },{
         "rol":2,
         "nombre":"Administrador"
     }]; 
     constructor(
       private fb: FormBuilder,
        private _user:UserService,
        private router: Router,
        public snackBar: MatSnackBar
    ) {}
    ngOnInit() {
        this.cargando=true
        this.data=this._user.getIdentity()
        console.log(this.data)
        if(this.data){
         
            var paso;
        this.mode="determinate";
        this.cargando=false;
            this.myForm = this.fb.group({
                idusuario:this.data.idusuario,
                apellido:this.data.apellido,
                nombre:this.data.nombre,
                clave:"",
                rol:this.data.rol,
                opcion:'2'})
        }
         
        
        

    }
    editarUsuario() {
        this._user.crudUsuario(this.myForm.value).subscribe(data=>{ 
          console.log(data)
          this.cargando=false;
          this.openSnackBar(data[0]._info_desc,data[0]._info_titulo);
        },error=>{
            this.cargando=false;
          })  
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }

}

