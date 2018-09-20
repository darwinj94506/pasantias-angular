import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar,MatSort, MatTableDataSource} from '@angular/material';
import{ReportesService} from './../../../shared/services/reportes.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  ucedula='';
  scedula=''; //cedulaSolicitante de persona que solcito el material
  fecha1='';
  fecha2='';
  nregistro=0;
  no_existe_registro=false;
  @ViewChild('contenido') content:ElementRef;


  constructor(private fb: FormBuilder, private _reportes:ReportesService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      serie:'0'
    })
  }
  
      // //----pdf-----
      // let doc = new jsPDF('l', 'mm', 'a4');
      // let specialElementHandlers={
      //   '#editor':function(element,rederer){
      //     return true;
      //   }
      // };
      // let content=this.content.nativeElement;
      // doc.fromHTML(content.innerHTML,15,15,{
      //   'width':150,
      //   'elementHandlers':specialElementHandlers,
     
      // });
      // doc.save('reporte');

      // ---------------nuevo pdf
      public captureScreen()  
  {  
    var data = document.getElementById('contenido');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  
  
//----pdf-------
  
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
          }else{
          
          }
          console.log(data);
        })
      }else if(this.opcionFiltro==2){ //reporte por id de usuario (la persona que ingresa el material)
        this._reportes.getReporteIngreso({'ucedula':this.ucedula}).subscribe((data)=>{
          this.ELEMENT_DATA=data.data;
          if(this.ELEMENT_DATA.length==0){
            this.no_existe_registro=true;
          }
          console.log(data);
        })

      }
    }else if(this.opcionBusqueda==3){ //reportes de egresos
      if(this.opcionFiltro==1){ //filtro por fechas
        this._reportes.getReporteDetalleEgreso({'fecha1':this.fecha1,'fecha2':this.fecha2}).subscribe((data)=>{
          console.log(data);
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }
        })

      }else if(this.opcionFiltro==2){ //filtro por cedulaSolicitante
        this._reportes.getReporteDetalleEgreso({'scedula':this.scedula}).subscribe((data)=>{
          console.log(data);
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
          }
        })

      }else if(this.opcionFiltro==3){ // egresos por numero de registro
        alert("registro");
        this.nregistro-=1000;
        this._reportes.getReporteDetalleEgreso({'nregistro':this.nregistro}).subscribe((data)=>{
          console.log(data);
          this.DETALLE_EGRESO_DATA=data.data;
          if(this.DETALLE_EGRESO_DATA.length==0){
            this.no_existe_registro=true;
            
          }
        })

      }
  }
    
   
  }

}
