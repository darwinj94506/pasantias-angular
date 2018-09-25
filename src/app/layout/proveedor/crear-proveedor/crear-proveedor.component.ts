import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{ProveedorService} from './../../../shared/services/proveedor.service';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.scss']
})
export class CrearProveedorComponent implements OnInit {
  cargando=false;
  active = true; 
  tiposMat:any;
  myForm: FormGroup; 

  constructor(
    private _proveedor:ProveedorService,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearProveedorComponent>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      idproveedor:'0',
      nombre:['',Validators.compose([Validators.required,Validators.maxLength(50)])],
      telefono1:['',Validators.maxLength(10)],
      telefono2:['',Validators.maxLength(10)],
      email:['',Validators.maxLength(50)],
      direccion:['',Validators.maxLength(50)],
      ruc:['',Validators.maxLength(13)],
      opcion:'1'
     
    })
    if(this.data){
      // this.myForm.reset();
      this.myForm = this.fb.group({
        idproveedor:this.data.idproveedor,
        nombre:[this.data.nombre,Validators.compose([Validators.required,Validators.maxLength(50)])],
        telefono1:[this.data.telefono1,Validators.maxLength(10)],
        telefono2:[this.data.telefono2,Validators.maxLength(10)],
        email:[this.data.email,Validators.maxLength(50)],
        direccion:[this.data.direccion,Validators.maxLength(50)],
        ruc:[this.data.ruc,Validators.maxLength(13)],
        opcion:'1'
      })
    }
  }

  crudProveedor(){
    this.cargando=true;
        this._proveedor.crudProveedor(this.myForm.value).subscribe(data=>{
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


