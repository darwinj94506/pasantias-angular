import { Component, OnInit,Inject,OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, Validators, FormGroup,FormControl } from "@angular/forms";

@Component({
  selector: 'app-modal-ver-detalle',
  templateUrl: './modal-ver-detalle.component.html',
  styleUrls: ['./modal-ver-detalle.component.scss']
})
export class ModalVerDetalleComponent implements OnInit {

  myForm: FormGroup; 
  accion:number=1;
  materiales:any;
  identity:any;
  proveedores:any;
  garantias:any;
  tiposMat;

  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalVerDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {
     }
     ngOnInit() {
      this.inicializarFormulario();
     }
      ngOnChanges(){   
      }
    inicializarFormulario(){
      this.myForm = this.fb.group({
      idmaterial:this.data.material,
      idproveedor:this.data.proveedor,
      idgarantia:this.data.garantia,
      cantidad:this.data.cantidad,
      serie:this.data.serie,
      descripcion:this.data.descripcion,
      idtipo:this.data.nombretipo

    })
  }
  close(data=null) {
    console.log(this.myForm.value);
      this.dialogRef.close(data);
      // this.dialogRef.close();
  }
}
