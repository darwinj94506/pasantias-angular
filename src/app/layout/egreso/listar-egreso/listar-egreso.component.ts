// import { Component, OnInit } from '@angular/core';
import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import{EgresoService} from './../../../shared/services/egreso.service';
import {MatDialog, MatDialogRef, 
  MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{ModalVerDetalleComponent} from './../modal-ver-detalle/modal-ver-detalle.component';

@Component({
  selector: 'app-listar-egreso',
  templateUrl: './listar-egreso.component.html',
  styleUrls: ['./listar-egreso.component.scss']
})
export class ListarEgresoComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 50;
  cargando=false;
  displayedColumns: string[] = [ 'nombre','apellido' ,'fecha', 'star'];
  ELEMENT_DATA: any[] = [];
  length=0;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _egreso:EgresoService,public router: Router,
    public dialog: MatDialog, public snackBar: MatSnackBar) {}
  ngOnInit() {
    this.paginator.pageIndex=0;
    this.cargarTabla();
    
  }
  cargarTabla(){
    this._egreso.getTotalEgreso().
      subscribe((data)=>{
        this.length=data.data[0].count;
        console.log(data.data[0].count);
      });
    this._egreso.getPaginarEgresos({"page":0,"itemsPerPage":10}).subscribe((data)=>{
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
  this._egreso.getPaginarEgresos({"page":this.pageEvent.pageIndex,
                              "itemsPerPage":this.pageEvent.pageSize})
                              .subscribe((data)=>{
                                this.ELEMENT_DATA=data.data;
                                console.log(this.ELEMENT_DATA);                               
                              })
  }

  abrirModalVerDetalle(data=null){
     
       const dialogRef = this.dialog.open(ModalVerDetalleComponent , {
         hasBackdrop:true,
         width:"70%",
         height:"80%",
         data:data
       });
       dialogRef.afterClosed().subscribe(result => {
         console.log(result);
         if(result[0]._info_id){
          this.cargarTabla();
        }
         this.openSnackBar(result[0]._info_desc,result[0]._info_titulo);
       },error=>{
       console.log(error);
     })
    }
   
    // eliminar(row){
    //    const dialogConfig = new MatDialogConfig();
    //    dialogConfig.disableClose = true;
    //    dialogConfig.autoFocus = true;
    //    const dialogRef = this.dialog.open(ModalEliminar , {
    //      hasBackdrop:true,
    //      width:"40%",
    //      height:"35%",
    //      data: row
    //    });
    //    dialogRef.afterClosed().subscribe(result => {
    //      if(result){
    //       this._tipo.crudTipo({idtipo:row.idtipo,
    //         nombre:row.nombre,
    //         opcion:'3'}).subscribe(data=>{
    //           console.log(data);
    //           if(data[0]._info_id){
    //             this.cargarTabla();
    //           }
    //           this.openSnackBar(data[0]._info_desc,data[0]._info_titulo);            
    //         })     
    //      }          
    //    },error=>{
    //    console.log(error);
    //  })     
    // }   
}





