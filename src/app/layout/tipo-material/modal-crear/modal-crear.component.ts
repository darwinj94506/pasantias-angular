import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import{TipoMaterialService} from './../../../shared/services/tipo-material.service';
@Component({
  selector: 'app-modal-crear',
  templateUrl: './modal-crear.component.html',
  styleUrls: ['./modal-crear.component.scss']
})
export class ModalCrearComponent implements OnInit {
  cargando=false;
  active = true; 
  myForm: FormGroup; 
  accion:number=1;

  ngOnInit() {
    
    this.myForm = this.fb.group({
      idtipo:'0',
      nombre:['',Validators.compose([Validators.required,Validators.maxLength(50)])],
      opcion:'1' 
    })

    if(this.data){
      this.myForm = this.fb.group({
        idtipo:this.data.idtipo,
        nombre:[this.data.nombre,Validators.compose([Validators.required,Validators.maxLength(50)])],
        opcion:'2' 
      })
    }
    
  }
    constructor(  private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalCrearComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _tipo:TipoMaterialService,
        public dialog: MatDialog,
    ) {
      console.log(this.data);
     
    }

    crudTipo(){

      console.log(this.myForm.value);
      this.cargando=true;
      console.log(this.myForm.value);
      this._tipo.crudTipo(this.myForm.value).subscribe(data=>{
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
