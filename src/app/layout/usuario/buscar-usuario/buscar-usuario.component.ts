import { Component, Inject, OnInit , ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import{ UserService} from './../../../shared/services/usuario.service';
import{ActivatedRoute} from '@angular/router';
import{CrearUsuarioComponent} from '../crear-usuario/crear-usurio.component'




@Component({
    selector: 'app-buscar-usuario',
    templateUrl: './buscar-usuario.component.html',
    styleUrls: ['./buscar-usuario.component.scss']
})
export class BuscarUsuarioComponent implements OnInit {
    
   
    myForm: FormGroup; 
    cargando=false;
     active = true;
     displayedColumns: string[] = [ 'nombre','apellido','ci','usuario_id','star'];
     ELEMENT_DATA: any[] ;
     length=0;
     //
     
    constructor(
        public dialogRef: MatDialogRef< BuscarUsuarioComponent>,private fb: FormBuilder,private _user:UserService,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private router: Router
    ) {}

    ngOnInit() {
        // if(this.data){
        this.myForm = this.fb.group({
            nombre:'',
            ci:'',
            apellido:'',
            usuario_id:''
            
            })
        // }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    buscar(){
        this.cargando=true;
        console.log(this.myForm.value);
        //this.mode="indeterminante";
        this._user.getUsuariosdb(this.myForm.value)
        .subscribe((data)=>{
            console.log(data);
            if(data){
                this.ELEMENT_DATA=data;
                this.cargando=false;
            }
          this.ELEMENT_DATA=data;
          console.log(this.ELEMENT_DATA);
        })
    }
    openDialogCrear(row) : void {
        // const dialogRef = this.dialog.open(CrearUsuarioComponent, {
        //     width:"35%",
        //     height:"75%",
        //     data:row
        // });
        // this.dialogRef.close();
        console.log(row);
        this.close(row);
    }
    
    close(row) {
        this.dialogRef.close(row);
    }
   
}










