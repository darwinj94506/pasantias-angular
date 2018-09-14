// import { Component, OnInit } from '@angular/core';
import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import{GarantiaService} from './../../../shared/services/garantia.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{ActivatedRoute} from '@angular/router';

//dialogo modificar
import {  EditarGarantiaComponent } from '../editar-garantia/editar-garantia.component';
//dialogo crear
import {  CrearGarantiaComponent}   from '../crear-garantia/crear-garantia.component';
@Component({
  selector: 'app-listar-garantia',
  templateUrl: './listar-garantia.component.html',
  styleUrls: ['./listar-garantia.component.scss']
})
export class ListarProveedorComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 50;
  cargando=false;
  
    displayedColumns: string[] = [ 'nombreproveedor', 'descripcion','star'];
    ELEMENT_DATA: any[] = [];
    length=0;
    pageEvent: PageEvent;
  
 
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _garantia:GarantiaService,public router: Router, public snackBar: MatSnackBar,
      public dialog: MatDialog) {
    }
    ngOnInit() {
      this.paginator.pageIndex=0;
      this.cargarTabla();
    }
    cargarTabla(){
      this._garantia.getTotalGarantias().
        subscribe((data)=>{
          this.length=data.data[0].count;
          console.log(data.data[0].count);
        });
      this._garantia.getGarantias({"page":0,"itemsPerPage":10}).subscribe((data)=>{
       this.ELEMENT_DATA=data.data;
       this.mode="determinate";
        this.cargando=true;
       console.log(this.ELEMENT_DATA);
        })
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
    paginar(evento){
      this.pageEvent = evento;
      console.log(this.pageEvent.pageIndex);
      console.log(this.pageEvent.pageSize);
      this._garantia.getGarantias({"page":this.pageEvent.pageIndex,
                                  "itemsPerPage":this.pageEvent.pageSize})
                                  .subscribe((data)=>{
                                    this.ELEMENT_DATA=data.data;
                                    console.log(this.ELEMENT_DATA);                               
                                  })
      }
      openDialog(row): void {
        const dialogRef = this.dialog.open(EditarGarantiaComponent, {
            width: '30%',
           height:"45%",
            data:row
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result[0]._info_id){
           this.cargarTabla();
         }
          this.openSnackBar(result[0]._info_desc,result[0]._info_titulo);
        },error=>{
          console.log(error);
        })
    }
    openCrearDialog(data=null):void{
      const dialogRef = this.dialog.open(CrearGarantiaComponent, {
        hasBackdrop:true,
        width:"30%",
        height:"45%",
       data:data
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result[0]._info_id){
       this.cargarTabla();
     }
      this.openSnackBar(result[0]._info_desc,result[0]._info_titulo);
    },error=>{
      console.log(error);
    })

    }
      eliminar(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(ModalEliminar , {
        hasBackdrop:true,
        width:"40%",
        height:"25%",
        data: row
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this._garantia.crudGarantia ({idgarantia:row.idgarantia,idproveedor:row.idproveedor,
            desc:row.descripcion,opcion:'3'}).subscribe(data=>{
             console.log(data);
             if(data[0]._info_id){
               this.cargarTabla();
             }
             this.openSnackBar(data[0]._info_desc,data[0]._info_titulo);            
           })     
        }          
      },error=>{
      console.log(error);
    })     
   }     
}


@Component({
  selector: 'Modal-eliminar ',
  template: `
  <h1 mat-dialog-title align="center" >¿Está seguro que desea eliminar " {{titulo}} "? </h1>
  <mat-divider></mat-divider>
<div mat-dialog-content>
<p>Presione aceptar para confirmar</p>
</div>
<mat-divider></mat-divider >
<div mat-dialog-actions align="center">
  <button mat-button   (click)="clickAceptar()" tabindex="-1">Aceptar</button>
  <button mat-button   (click)="clickCancelar()" tabindex="-1">Cancelar</button>
</div>
  
  `
})

export class ModalEliminar  {
  //public desc=this.data[0]._info_desc;
  public titulo=this.data.nombre;
  //public estado=this.data[0]._info_id;


  constructor(
    public dialogRef: MatDialogRef<ModalEliminar>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  clickAceptar(): void { 
    console.log(this.data);
    this.dialogRef.close(true);
  }
  clickCancelar(): void { 
    console.log(this.data);
    this.dialogRef.close(false);
  }
  
}


