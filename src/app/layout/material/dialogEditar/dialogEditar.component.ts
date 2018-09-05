import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import{MaterialService} from './../../../shared/services/material.service';



@Component({
    selector: 'app-dialogEditar',
    templateUrl: './dialogEditar.component.html',
    styleUrls: ['./dialogEditar.component.scss']
})
export class DialogOverviewComponent implements OnInit {
    myForm: FormGroup; 
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewComponent>,private fb: FormBuilder,private _material:MaterialService,
        @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {}
    ngOnInit() {
        if(this.data){
            this.myForm = this.fb.group({
                idmaterial: this.data.idmaterial,
                idtipo:this.data.idtipo,
                nombre:this.data.nombre,
                opcion:'2'
               
              })
        }   
        
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    editarMaterial(){
        console.log(this.myForm.value);
        this._material.crudMaterial(this.myForm.value).subscribe(data=>{
          console.log(data)
        })
        this.dialogRef.close();
        

    }

   
}









