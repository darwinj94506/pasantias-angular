import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{MaterialService} from './../../../shared/services/material.service';

@Component({
  selector: 'app-crearMaterial',
  templateUrl: './crearMaterial.component.html',
  styleUrls: ['./crearMaterial.component.scss']
})
export class CrearComponent implements OnInit {
  cargando=false;
  active = true; 
  tiposMat:any;
  myForm: FormGroup; 

  constructor(
    private _material:MaterialService,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearComponent>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      idmaterial:'0',
      idtipo:['',Validators.required],
      nombre:['',Validators.compose([Validators.required,Validators.maxLength(50)])],
      opcion:'1',
      stockminimo:['',Validators.compose([Validators.required,Validators.min(1)])]
     
    })
    if(this.data){
      // this.myForm.reset();
      this.myForm = this.fb.group({
        idmaterial:this.data.idmaterial,
        idtipo:[this.data.idtipo,Validators.required],
        nombre:[this.data.nombre,Validators.compose([Validators.required,Validators.maxLength(10)])],
        stockminimo:[this.data.stockminimo,Validators.compose([Validators.required,Validators.min(1)])],
        opcion:'1' 
      })
    }

    this._material.getListaTipos().subscribe((data)=>{
      this.tiposMat=data.data; 
    },error=>{
      console.log(error);
    })
  }

  crudMaterial(){
    this.cargando=true;
        this._material.crudMaterial(this.myForm.value).subscribe(data=>{
          this.cargando=false;
        },error=>{
            this.cargando=false;
            alert("Error en la transaccion");
            this.dialogRef.close(0);  
          })
           
}
close(data) {
  this.dialogRef.close(data);
}

}


