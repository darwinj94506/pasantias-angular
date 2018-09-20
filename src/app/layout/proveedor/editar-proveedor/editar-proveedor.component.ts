import { Component, Inject, OnInit , ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import{ProveedorService} from './../../../shared/services/proveedor.service';
import{ActivatedRoute} from '@angular/router';




@Component({
    selector: 'app-editar-proveedor',
    templateUrl: './editar-proveedor.component.html',
    styleUrls: ['./editar-proveedor.component.scss']
})
export class EditarProveedorComponent implements OnInit {
    myForm: FormGroup; 
    cargando=false;
     active = true;
     tiposMat:any; 
     accion=false;
    constructor(
        public dialogRef: MatDialogRef<EditarProveedorComponent>,private fb: FormBuilder,private _proveedor:ProveedorService,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private router: Router
    ) {}
    ngOnInit() {
        
        if(this.data){
            if(this.data.accion==2){
                this.accion=true
            }else{
                this.accion=false
            }
            console.log(this.accion)
            this.myForm = this.fb.group({
                idproveedor: this.data.idproveedor,
                nombre:[this.data.nombre,Validators.compose([Validators.required,Validators.maxLength(50)])],
                telefono1:[this.data.telefono1,Validators.compose([Validators.required,Validators.maxLength(10)])],
                telefono2:this.data.telefono2,
                email:this.data.email,
                direccion:this.data.direccion,
                ruc:this.data.ruc,
                opcion:'2'
               
              })
        }  
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
   editarProveedor() {
        this.cargando=true;
        console.log(this.myForm.value);
        this._proveedor.crudProveedor(this.myForm.value).subscribe(data=>{
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










