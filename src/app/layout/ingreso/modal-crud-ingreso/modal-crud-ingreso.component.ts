import { Component, OnInit,Inject,OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, Validators, FormGroup,FormControl } from "@angular/forms";
import{IngresoService} from './../../../shared/services/ingreso.service';
@Component({
  selector: 'app-modal-crud-ingreso',
  templateUrl: './modal-crud-ingreso.component.html',
  styleUrls: ['./modal-crud-ingreso.component.scss']
})
export class ModalCrudIngresoComponent implements OnInit,OnChanges {
  cargando=false;
  active = true; 
  myForm: FormGroup; 
  accion:number=1;
  materiales:any;
  identity:any;
  proveedores:any;
  garantias:any;
  tiposMat;
  // proveedor = new FormControl('');

  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCrudIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _ingreso:IngresoService,
    public dialog: MatDialog) {
       this.identity=this._ingreso.getIdentity(); 
     }
     ngOnInit() {
  
      this.inicializarFormulario();
      this.cargarProveedores();
      this.cargarTipos();
    
     }
  ngOnChanges(){   
  }
  inicializarFormulario(){
    this.myForm = this.fb.group({
      idingreso:0,
      idusuario:this.identity.idusuario,
      idmaterial:[null,Validators.required],
      idproveedor:null,
      idgarantia:null,
      cantidad:[1,Validators.compose([Validators.required,Validators.min(1)])],
      serie:['',Validators.maxLength(50)],
      descripcion:['',Validators.maxLength(200)],
      opcion:1,
      idtipo:[null,Validators.required]

    })
  }
  
  cargarProveedores(){
    this._ingreso.getProveedoresSelect().subscribe((data)=>{
      this.proveedores=data.data; 
    })
  }
  cargarGarantias(){
    this._ingreso.getGarantiasSelect(this.myForm.get('idproveedor').value).subscribe((data)=>{
      this.garantias=data.data; 
    },error=>{
      console.log(error);
    })
  }
  cargarTipos(){
    console.log(this.myForm.get('idproveedor').value);
    this._ingreso.getListaTipos().subscribe((data)=>{
      this.tiposMat=data.data; 
    },error=>{
      console.log(error);
    })
  }
  cargarMateriales(){
    console.log(this.myForm.get('idtipo').value);
    this._ingreso.getMaterialesSelect({'idtipo':this.myForm.get('idtipo').value}).subscribe((data)=>{
      this.materiales=data.data; 
    },error=>{
      console.log(error);
    })
  }
  // idusuario:this.identity.idusuario,
  
  crudIngreso(){
    this.cargando=true;
    this._ingreso.crudIngreso(this.myForm.value).subscribe(data=>{
      this.cargando=false;
      this.close(data);
  },error=>{
    this.cargando=false;
  })
}

close(data=null) {
    this.dialogRef.close(data);
    // this.dialogRef.close();
}
}
