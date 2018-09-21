import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{GarantiaService} from './../../../shared/services/garantia.service';

@Component({
  selector: 'app-crear-garantia',
  templateUrl: './crear-garantia.component.html',
  styleUrls: ['./crear-garantia.component.scss']
})
export class CrearGarantiaComponent implements OnInit {
  cargando=false;
  active = true; 
  proveedores:any;
  myForm: FormGroup; 

  constructor(
    private _garantia:GarantiaService,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearGarantiaComponent>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      idgarantia:'0',
      idproveedor:['0',Validators.required],
      descripcion:['',Validators.compose([Validators.required,Validators.maxLength(200)])],
      opcion:'1'
     
    })
    if(this.data){
      // this.myForm.reset();
      this.myForm = this.fb.group({
        idgarantia:this.data.idgarantia,
        idproveedor:[this.data.idproveedor,Validators.required],
        descripcion:[this.data.descripcion,Validators.compose([Validators.required,Validators.maxLength(200)])],
        opcion:'1' 
      })
    }

    this._garantia.getListaProveedores().subscribe((data)=>{
      console.log(data);
      this.proveedores=data.data; 
    },error=>{
      console.log(error);
    })
  }

  crudGarantia(){
    this.cargando=true;
        console.log(this.myForm.value);
        this._garantia.crudGarantia(this.myForm.value).subscribe(data=>{
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


