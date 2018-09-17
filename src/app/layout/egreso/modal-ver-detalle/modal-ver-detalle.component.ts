import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, Validators, FormGroup,FormControl } from "@angular/forms";
import {EgresoService} from '../../../shared/services/egreso.service';

@Component({
  selector: 'app-modal-ver-detalle',
  templateUrl: './modal-ver-detalle.component.html',
  styleUrls: ['./modal-ver-detalle.component.scss']
})
export class ModalVerDetalleComponent implements OnInit {
  displayedColumns: string[] = ['nombre' ,'sum'];
  detailColumns: string[] = ['material' ,'cantidad','serie','proveedor','descripcion'];

  ELEMENT_DATA: any[] = [];
  DETAIL_DATA: any[] = [];
  myForm: FormGroup; 
  length=0;


  constructor( private fb: FormBuilder,private  _egreso:EgresoService,
    public dialogRef: MatDialogRef<ModalVerDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {
      // this.identity=this._ingreso.getIdentity();
      console.log(data);
      
     }

  ngOnInit() {
    this.inicializarFormulario();
    console.log(this.data);
    this._egreso.getDetalles(this.data.idegreso).subscribe((data)=>{
      console.log(data);
      this.ELEMENT_DATA=data.data;
    })
    this._egreso.getDetalleEgreso(this.data.idegreso).subscribe((data)=>{
      console.log(data);
      this.DETAIL_DATA=data.data;
    })
    
  }
  inicializarFormulario(){
    this.myForm = this.fb.group({
      idusuario:this.data.idusuario,
      idsolicitante:this.data.solicitante,
      memorando:this.data.memorando,
      fecha:this.data.fecha,
      observacion:this.data.observacion
    })
  }

}
