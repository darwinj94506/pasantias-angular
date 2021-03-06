import { Component, Inject, OnInit , ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import{GarantiaService} from './../../../shared/services/garantia.service';
import{ActivatedRoute} from '@angular/router';
@Component({
    selector: 'app-editar-garantia',
    templateUrl: './editar-garantia.component.html',
    styleUrls: ['./editar-garantia.component.scss']
})
export class EditarGarantiaComponent implements OnInit {
    myForm: FormGroup; 
    cargando=false;
     active = true;
     proveedores:any; 
    constructor(
        public dialogRef: MatDialogRef<EditarGarantiaComponent>,private fb: FormBuilder,
        private _garantia:GarantiaService,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private router: Router
    ) {}
    ngOnInit() {
        if(this.data){
            this.myForm = this.fb.group({
                idgarantia:this.data.idgarantia,
                idproveedor:[this.data.idproveedor,Validators.required],
                descripcion:[this.data.descripcion,Validators.compose([Validators.required,Validators.maxLength(200)])],
                opcion:'2' 
               
              })
        } 
        this._garantia. getListaProveedores().subscribe((data)=>{
            console.log(data);
            this.proveedores=data.data; 
          },error=>{
            console.log(error);
          })

        
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }
   editarGarantia() {
        this.cargando=true;
        console.log(this.myForm.value);
        this._garantia.crudGarantia(this.myForm.value).subscribe(data=>{
          console.log(data)
          this.cargando=false;
          this.close(data);
        },error=>{
            alert("Error al editar")
            this.cargando=false;
          })
    }
    
    close(data) {
        this.dialogRef.close(data);
    }
   
}










