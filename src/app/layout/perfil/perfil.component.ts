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
    ) {
        this.data=this._user.getIdentity()
    }
    ngOnInit() {
        this.cargando=true
        if(this.data){
         
            var paso;
        this.mode="determinate";
        this.cargando=false;
            this.myForm = this.fb.group({
                idusuario:this.data.idusuario,
                apellido:this.data.apellido,
                nombre:this.data.nombre,
                clave:['',Validators.required],
                nuevaClave:['',Validators.required],
                rol:this.data.rol,
                opcion:'2'})
        }
         
        
        

    }
    editarUsuario() {
        this.cargando=true;
        this._user.cambiarClave(this.myForm.value).subscribe(data=>{ 
          this.cargando=false;
          this.openSnackBar("Password actualizada","Éxito");
        },error=>{
            
          this.openSnackBar("Inténtelo nuevamente","Error");
            this.cargando=false;
          })  
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }

}

