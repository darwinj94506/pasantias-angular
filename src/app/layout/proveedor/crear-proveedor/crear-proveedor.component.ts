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
      nombre:'',
      telefono1:'',
      telefono2:'',
      email:'',
      direccion:'',
      ruc:'',
      opcion:'1'
     
    })
    if(this.data){
      // this.myForm.reset();
      this.myForm = this.fb.group({
        idproveedor:this.data.idproveedor,
        nombre:this.data.nombre,
        telefono1:this.data.telefono1,
        telefono2:this.data.telefono2,
        email:this.data.email,
        direccion:this.data.direccion,
        ruc:this.data.ruc,
        opcion:'1'
      })
    }
  }

  crudProveedor(){
    this.cargando=true;
        console.log(this.myForm.value);
        this._proveedor.crudProveedor(this.myForm.value).subscribe(data=>{
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


