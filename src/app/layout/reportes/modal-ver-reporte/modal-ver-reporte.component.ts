import { Component, OnInit,Inject,ViewChild,ElementRef  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, Validators, FormGroup,FormControl } from "@angular/forms";
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-modal-ver-reporte',
  templateUrl: './modal-ver-reporte.component.html',
  styleUrls: ['./modal-ver-reporte.component.scss']
})
export class ModalVerReporteComponent implements OnInit {

  displayedColumns: string[] = ['nusuario', 'material', 'serie','garantia','proveedor','fecha'];
  INGRESO_DATA: any[] = [];
  detalleIngresoColumns: string[] = ['idegreso','nsolicitante', 'material','cantidad', 'serie','garantia','proveedor'];
  DETALLE_EGRESO_DATA: any[] = [];

  materialColumns: string[] = ['nombre','nombretipo', 'stock'];
  MATERIAL_DATA: any[] = [];
  @ViewChild('contenido') content:ElementRef;
  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalVerReporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {
      // this.identity=this._ingreso.getIdentity();
      console.log(this.data);
      
     }
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
         let pdf = new jsPDF('a4', 'mm', 'a4'); // A4 size page of PDF  
         var position = 0;  
         pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
         pdf.save('MYPdf.pdf'); // Generated PDF   
       });  
     }  
     imprimir()  
     {  
       var data = document.getElementById('contenido');  
       html2canvas(data).then(canvas => {  
         // Few necessary setting options  
         var imgWidth = 208;   
         var pageHeight = 295;    
         var imgHeight = canvas.height * imgWidth / canvas.width;  
         var heightLeft = imgHeight;  
         const contentDataURL = canvas.toDataURL('image/png')  
         let pdf = new jsPDF('a4', 'mm', 'a4'); // A4 size page of PDF  
         var position = 0;  
         pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
         pdf.autoPrint();
       });  
     }  
       

  ngOnInit() {
    console.log(this.data);   
    if(this.data.tipo==1){
      this.INGRESO_DATA=this.data.data;

    }else if(this.data.tipo==2){
      this.DETALLE_EGRESO_DATA=this.data.data;
    }else{
      this.MATERIAL_DATA=this.data.data;
    }
  }

  
  close(data) {
    this.dialogRef.close(data);
  }
  
  
 


  
  

}
