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
      idmaterial:null,
      idproveedor:null,
      idgarantia:null,
      cantidad:1,
      serie:'',
      descripcion:'',
      opcion:1,
      idtipo:null

    })
  }
  
  cargarProveedores(){
    this._ingreso.getProveedoresSelect().subscribe((data)=>{
      console.log(data);
      this.proveedores=data.data; 
    })
  }
  cargarGarantias(){
    console.log(this.myForm.get('idproveedor').value);
    this._ingreso.getGarantiasSelect(this.myForm.get('idproveedor').value).subscribe((data)=>{
      console.log(data);
      this.garantias=data.data; 
    },error=>{
      console.log(error);
    })
  }
  cargarTipos(){
    console.log(this.myForm.get('idproveedor').value);
    this._ingreso.getListaTipos().subscribe((data)=>{
      console.log(data);
      this.tiposMat=data.data; 
    },error=>{
      console.log(error);
    })
  }
  cargarMateriales(){
    console.log(this.myForm.get('idtipo').value);
    this._ingreso.getMaterialesSelect({'idtipo':this.myForm.get('idtipo').value}).subscribe((data)=>{
      console.log(data);
      this.materiales=data.data; 
    },error=>{
      console.log(error);
    })
  }
  // idusuario:this.identity.idusuario,
  
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
