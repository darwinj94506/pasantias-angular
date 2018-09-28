import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar,MatSort, MatTableDataSource} from '@angular/material';
import{ReportesService} from './../../../shared/services/reportes.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ModalVerReporteComponent} from './../modal-ver-reporte/modal-ver-reporte.component';
@Component({
  selector: 'app-reporte-principal',
  templateUrl: './reporte-principal.component.html',
  styleUrls: ['./reporte-principal.component.scss']
})
export class ReportePrincipalComponent implements OnInit {
  myForm: FormGroup; 
  displayedColumns: string[] = [ 'material', 'serie','garantia','proveedor','usuario'];
  INGRESO_DATA: any[] = [];
  detalleIngresoColumns: string[] = ['solicitante', 'material','cantidad', 'serie','garantia','proveedor','usuario'];
  DETALLE_EGRESO_DATA: any[] = [];

  opcionBusqueda=0;
  opcionFiltro=0;
  serie='';
  idsolicitante='';
  ucedula='';
  scedula=''; //cedulaSolicitante de persona que solicito el material
  fecha1='';
  fecha2='';
  nregistro=0;
  no_existe_registro=false;
  
  constructor(private fb: FormBuilder, private _reportes:ReportesService,public dialog: MatDialog) { }
  ngOnInit() {
    this.myForm = this.fb.group({
      serie:'0'
    })
  }

  abrirModalVerDetalle(data=null,tipo){ 
    let array={
      tipo:tipo,
      data:data
    } 
    const dialogRef = this.dialog.open(ModalVerReporteComponent , {
      hasBackdrop:true,
      width:"99%",
      height:"99%",
      data:array
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log("cerros");
    
    },error=>{
  
  })
}
  consultar(){
    this.INGRESO_DATA=[];
    this.DETALLE_EGRESO_DATA=[];
    this.no_existe_registro=false;
    if(this.opcionBusqueda==1){ //reporte de materiales dada una serie, se busca primero en los egresos y si no existe esa serie ahi, se busca en los ingresos
      this._reportes.getReporteDetalleEgreso({'serie':this.serie}).subscribe((data)=>{
        console.log(data);
        this.DETALLE_EGRESO_DATA=data.data;
        if(this.DETALLE_EGRESO_DATA.length==0){
          this._reportes.getReporteIngreso({'serie':this.serie}).subscribe((data)=>{
            this.INGRESO_DATA=data.data;
            if(this.INGRESO_DATA.length==0){
              this.no_existe_registro=true;
            }else{
              this.abrirModalVerDetalle(this.INGRESO_DATA,1);
            }
          })
        }else{
          this.abrirModalVerDetalle(this.DETALLE_EGRESO_DATA,2);
        }
      })
    }else if(this.opcionBusqueda==2){ //reporte ingresos
      if(this.opcionFiltro==1){ //reporte en un rango de dos fechas
        this._reportes.getReporteIngreso({'fecha1':this.fecha1,'fecha2':this.fecha2}).subscribe((data)=>{
          this.INGRESO_DATA=data.data;
          if(this.INGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }else{
            this.abrirModalVerDetalle(this.INGRESO_DATA,1);
          }
        })
      }else if(this.opcionFiltro==2){ //reporte por id de usuario (la persona que ingresa el material)
        this._reportes.getReporteIngreso({'ucedula':this.ucedula}).subscribe((data)=>{
          this.INGRESO_DATA=data.data;
          if(this.INGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }else{
            this.abrirModalVerDetalle(this.INGRESO_DATA,1);
          }
        })

      }
    }else if(this.opcionBusqueda==3){ //reportes de egresos
      if(this.opcionFiltro==1){ //filtro por fechas
        this._reportes.getReporteDetalleEgreso({'fecha1':this.fecha1,'fecha2':this.fecha2}).subscribe((data)=>{
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }else{
            this.abrirModalVerDetalle(this.DETALLE_EGRESO_DATA,2);
          }
        })

      }else if(this.opcionFiltro==4){ //filtro por cedulaSolicitante
        this._reportes.getReporteDetalleEgreso({'scedula':this.scedula}).subscribe((data)=>{
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }else{
            this.abrirModalVerDetalle(this.DETALLE_EGRESO_DATA,2);

          }
        })

      }else if(this.opcionFiltro==3){ // egresos por numero de registro
        
        let numre=(this.nregistro-1000);
        alert(this.nregistro);
        this._reportes.getReporteDetalleEgreso({'nregistro':this.nregistro-1000}).subscribe((data)=>{
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
            
          }else{
            this.abrirModalVerDetalle(this.DETALLE_EGRESO_DATA,2);

          }
        })

      }
  }
    
   
  }

}
