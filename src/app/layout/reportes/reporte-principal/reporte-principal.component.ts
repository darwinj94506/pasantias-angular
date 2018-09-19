import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar,MatSort, MatTableDataSource} from '@angular/material';
import{ReportesService} from './../../../shared/services/reportes.service';
@Component({
  selector: 'app-reporte-principal',
  templateUrl: './reporte-principal.component.html',
  styleUrls: ['./reporte-principal.component.scss']
})
export class ReportePrincipalComponent implements OnInit {
  myForm: FormGroup; 
  displayedColumns: string[] = [ 'material', 'serie','garantia','proveedor','usuario'];
  ELEMENT_DATA: any[] = [];
  detalleIngresoColumns: string[] = ['solicitante', 'material','cantidad', 'serie','garantia','proveedor','usuario'];
  DETALLE_EGRESO_DATA: any[] = [];

  opcionBusqueda=0;
  opcionFiltro=0;
  serie='';
  idsolicitante='';
  idusuario='';
  fecha1='';
  fecha2='';
  no_existe_registro=false;

  constructor(private fb: FormBuilder, private _reportes:ReportesService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      serie:'0'
    })
  }
  consultar(){
    this.ELEMENT_DATA=[];
    this.DETALLE_EGRESO_DATA=[];
    this.no_existe_registro=false;
    if(this.opcionBusqueda==1){ //reporte de materiales dada una serie de ingreso  
      this._reportes.getReporteDetalleEgreso({'serie':this.serie}).subscribe((data)=>{
        console.log(data);
        this.DETALLE_EGRESO_DATA=data.data;
        if(this.DETALLE_EGRESO_DATA.length==0){
          this._reportes.getReporteIngreso({'serie':this.serie}).subscribe((data)=>{
            this.ELEMENT_DATA=data.data;
            if(this.ELEMENT_DATA.length==0){
              this.no_existe_registro=true;
            }
            console.log(data);
          })
        }
      })
    }else if(this.opcionBusqueda==2){ //reporte ingresos
      if(this.opcionFiltro==1){ //reporte en un rango de dos fechas
        this._reportes.getReporteIngreso({'fecha1':this.fecha1,'fecha2':this.fecha2}).subscribe((data)=>{
          this.ELEMENT_DATA=data.data;
          if(this.ELEMENT_DATA.length==0){
            this.no_existe_registro=true;
          }
          console.log(data);
        })
      }else if(this.opcionFiltro==2){ //reporte por id de usuario (la persona que ingresa el material)
        this._reportes.getReporteIngreso({'idusuario':this.idsolicitante}).subscribe((data)=>{
          this.ELEMENT_DATA=data.data;
          if(this.ELEMENT_DATA.length==0){
            this.no_existe_registro=true;
          }
          console.log(data);
        })

      }
    }else if(this.opcionBusqueda==3){ //reportes de egresos
      if(this.opcionFiltro==1){
        this._reportes.getReporteDetalleEgreso({'fecha1':this.fecha1,'fecha2':this.fecha2}).subscribe((data)=>{
          console.log(data);
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }
        })

      }else if(this.opcionFiltro==2){
        this._reportes.getReporteDetalleEgreso({'idusuario':this.idusuario}).subscribe((data)=>{
          console.log(data);
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }
        })

      }else if(this.opcionFiltro==3){
      }
  }
    
   
  }

}
