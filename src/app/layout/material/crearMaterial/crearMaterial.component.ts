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
      idtipo:'0',
      nombre:'',
      opcion:'1'
     
    })
    if(this.data){
      // this.myForm.reset();
      this.myForm = this.fb.group({
        idmaterial:this.data.idmaterial,
        idtipo:this.data.idtipo,
        nombre:this.data.nombre,
        opcion:'1' 
      })
    }

    this._material.getListaTipos().subscribe((data)=>{
      console.log(data);
      this.tiposMat=data.data; 
    },error=>{
      console.log(error);
    })
  }

  crudMaterial(){
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


