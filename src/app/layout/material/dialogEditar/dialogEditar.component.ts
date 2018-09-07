import { Component, Inject, OnInit , ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import{MaterialService} from './../../../shared/services/material.service';
import{ActivatedRoute} from '@angular/router';




@Component({
    selector: 'app-dialogEditar',
    templateUrl: './dialogEditar.component.html',
    styleUrls: ['./dialogEditar.component.scss']
})
export class DialogOverviewComponent implements OnInit {
    myForm: FormGroup; 
    cargando=false;
     active = true;
     tiposMat:any; 
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewComponent>,private fb: FormBuilder,private _material:MaterialService,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private router: Router
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
        this._material.getListaTipos().subscribe((data)=>{
            console.log(data);
            this.tiposMat=data.data; 
          },error=>{
            console.log(error);
          })

        
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
   editarMaterial() {
        this.cargando=true;
        console.log(this.myForm.value);
        this._material.crudMaterial(this.myForm.value).subscribe(data=>{
          console.log(data)
          this.cargando=false;
          this.close(data);
        },error=>{
            this.cargando=false;
          })
        this.dialogRef.close();   
    }
    
    close(data) {
        this.dialogRef.close(data);
    }
   
}










