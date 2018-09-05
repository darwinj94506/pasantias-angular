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
    // if(this.data.length >1){
    //   this.myForm = this.fb.group({
    //     idtipo:this.data[0].idtipo,
    //     nombre:this.data[0].nombre,
    //     opcion:'2' 
    //   })
    //   this.accion=2;

    // }else{
    //   this.myForm = this.fb.group({
    //     idtipo:'0',
    //     nombre:'',
    //     opcion:'1' 
    //   })
    // }
    // this.myForm = this.fb.group({
    //   idtipo:this.data.idtipo,
    //   nombre:this.data.nombre,
    //   opcion:'2' 
    // })
    this.myForm = this.fb.group({
      idtipo:'',
      nombre:'',
      opcion:'1' 
    })
    console.log(this.data);

    if(this.data){
      // this.myForm.reset();
      this.myForm = this.fb.group({
        idtipo:this.data.idtipo,
        nombre:this.data.nombre,
        opcion:'2' 
      })
    }
    
  }
    constructor(  private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalCrearComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,private _tipo:TipoMaterialService,
        public dialog: MatDialog,
    ) {
      console.log(this.data);
     
    }

    crudTipo(){
      // this.myForm.patchValue({ 
      //                        opcion:opcion
      //                     });
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
