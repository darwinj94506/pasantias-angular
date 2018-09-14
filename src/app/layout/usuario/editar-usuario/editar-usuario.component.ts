import { Component, Inject, OnInit , ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import{ UserService} from './../../../shared/services/usuario.service';
import{ActivatedRoute} from '@angular/router';




@Component({
    selector: 'app-editar-usuario',
    templateUrl: './editar-usuario.component.html',
    styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
    myForm: FormGroup; 
    cargando=false;
     active = true;
     roles:any=[{
         "rol":1,
         "nombre":'Funcionario'
     },{
         "rol":2,
         "nombre":"Administrador"
     }]; 
     
    constructor(
        public dialogRef: MatDialogRef<EditarUsuarioComponent>,private fb: FormBuilder,
        private _user:UserService,
        @Inject(MAT_DIALOG_DATA) public data: any,
         public dialog: MatDialog,private router: Router
    ) {}
    ngOnInit() {
        if(this.data){
            if(this.data.rol=="Funcionario"){
                this.roles.rol=1;
                this.data.rol=this.data.rol
            }else{
                this.roles.rol=2;
                this.data.rol=this.data.rol
            }
            console.log(this.roles.rol);
            console.log(this.data.rol);
            this.myForm = this.fb.group({
                idusuario: this.data.idusuario,
                apellido:this.data.apellido,
                nombre:this.data.nombre,
                clave:this.data.clave,
                rol:this.roles.rol,
                opcion:'2'
               
              })

        } 

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
   editarUsuario() {
        this.cargando=true;
        console.log(this.myForm.value);
        
        this._user.crudUsuario(this.myForm.value).subscribe(data=>{ 
          console.log(data)
          this.cargando=false;
          this.close(data);
        },error=>{
            this.cargando=false;
          })  
    }
    
    close(data) {
        this.dialogRef.close(data);
    }
   
}










