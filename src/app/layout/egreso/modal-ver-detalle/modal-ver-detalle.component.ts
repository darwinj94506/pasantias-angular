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
  detailColumns: string[] = ['material' ,'cantidad','serie','proveedor','descripcion','estado','star'];

  ELEMENT_DATA: any[] = [];
  DETAIL_DATA: any[] = [];
  myForm: FormGroup; 
  length=0;
  numeroRegistro=0;


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
    this.getDetallesGlobal();
    this.getDetalleEgreso();
    this.numeroRegistro=this.data.idegreso+1000;
  }
    onNoClick(): void {
        this.dialogRef.close(null);
    }

  getDetalleEgreso(){
    this._egreso.getDetalleEgreso(this.data.idegreso).subscribe((data)=>{
      console.log(data);
      this.DETAIL_DATA=data.data;
    })
  }
  close(data) {
    this.dialogRef.close(data);
  }
  getDetallesGlobal(){
    this._egreso.getDetalles(this.data.idegreso).subscribe((data)=>{
      console.log(data);
      this.ELEMENT_DATA=data.data;
    })
  }
  inicializarFormulario(){
    //Datos de la cabecera del egreso,vienen como parametros de la tabla listar 
    this.myForm = this.fb.group({
      idusuario:this.data.idusuario,
      apellido:this.data.apellido,
      nombre:this.data.nombre,
      idsolicitante:this.data.solicitante,
      memorando:this.data.memorando,
      fecha:this.data.fecha,
      observacion:this.data.observacion
    })
  }
  cambiarEstado(element,estado){ //estado 1: en espera de retiro, estado 2: devuelto, estado 3:retirado
    // para ejecutar la funcion de la bdd en la opcion 2 (modificar) solo se necesita 
    //el iddetalle y la opcion 2
    console.log(element);
    this._egreso.crudDetalle(
      {"iddetalle":element.iddetalle,
      "idegreso":0,
      "idingreso":0,
      "cantidad":0,
      "opcion":2,
      "idmaterial":0,
      "estado":estado
    }).subscribe((data)=>{
        console.log(data);
        this.getDetalleEgreso();
        this.getDetallesGlobal()
      },error=>{
        alert("Error al editar estado")
      })
  }

  eliminar(element){
    this._egreso.crudDetalle(
      {"iddetalle":element.iddetalle,
      "idegreso":0,
      "idingreso":0,
      "cantidad":0,
      "opcion":3,
      "idmaterial":0}).subscribe((data)=>{
        console.log(data);
        this.getDetalleEgreso();
        this.getDetallesGlobal()

      },error=>{
        alert("Error al eliminar")
      })
  }
  
  

}
