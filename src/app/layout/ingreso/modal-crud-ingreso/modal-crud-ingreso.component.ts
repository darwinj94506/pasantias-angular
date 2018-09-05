import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import{IngresoService} from './../../../shared/services/ingreso.service';
@Component({
  selector: 'app-modal-crud-ingreso',
  templateUrl: './modal-crud-ingreso.component.html',
  styleUrls: ['./modal-crud-ingreso.component.scss']
})
export class ModalCrudIngresoComponent implements OnInit {
  cargando=false;
  active = true; 
  myForm: FormGroup; 
  accion:number=1;
  materiales:any;
  identity:any;

  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCrudIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _ingreso:IngresoService,
    public dialog: MatDialog) {
      this.identity=this._ingreso.getIdentity();
     }
    //  idusuario:this._ingreso.identity.idusuario,

  ngOnInit() {
    if(this.identity){
      this.myForm = this.fb.group({
        idingreso:0,
        idusuario:this.identity.idusuario,
        idmaterial:null,
        cantidad:null,
        opcion:1
      })
    }
    this._ingreso.getMaterialesSelect().subscribe((data)=>{
      console.log(data);
      this.materiales=data.data; 
    },error=>{
      console.log(error);
    })
    
  }
  crudIngreso(){
                     
    console.log(this.myForm.value);

    this.cargando=true;
    console.log(this.myForm.value);
    this._ingreso.crudIngreso(this.myForm.value).subscribe(data=>{
      console.log(data)
      this.cargando=false;
      this.close(data);
  },error=>{
    this.cargando=false;
  })
}

close(data=null) {
  console.log(this.myForm.value);
    this.dialogRef.close(data);
    // this.dialogRef.close();
}



}
