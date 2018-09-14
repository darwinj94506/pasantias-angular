// import { Component, OnInit } from '@angular/core';
import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import{TipoMaterialService} from './../../../shared/services/tipo-material.service';
import {MatDialog, MatDialogRef, 
  MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{ModalCrearComponent} from './../modal-crear/modal-crear.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 50;
  cargando= false;
  displayedColumns: string[] = ['nombre', 'idtipo', 'estado', 'fecha', 'star'];
  ELEMENT_DATA: any[] = [];
  length=0;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _tipo:TipoMaterialService,public router: Router,
      public dialog: MatDialog, public snackBar: MatSnackBar) {}
    ngOnInit() {
      this.paginator.pageIndex=0;
      this.cargarTabla();
      
    }
    cargarTabla(){
      this._tipo.totalTipo().
        subscribe((data)=>{
          this.length=data.data[0].count;
          console.log(data.data[0].count);
        });
      this._tipo.getPaginarTipos({"page":0, "itemsPerPage":10}) .subscribe((data)=>{
       this.ELEMENT_DATA=data.data;
      console.log(this.ELEMENT_DATA);
      this.mode="determinate";
        this.cargando=true;
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
      this._tipo.getPaginarTipos({"page":this.pageEvent.pageIndex,
                                  "itemsPerPage":this.pageEvent.pageSize})
                                  .subscribe((data)=>{
                                    this.ELEMENT_DATA=data.data;
                                    console.log(this.ELEMENT_DATA);                               
                                  })
      }

      abrirModalCrear(data=null){
         const dialogRef = this.dialog.open(ModalCrearComponent , {
           hasBackdrop:true,
           width:"40%",
           height:"35%",
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
     
      eliminar(row){
         //modal
         const dialogConfig = new MatDialogConfig();
         dialogConfig.disableClose = true;
         dialogConfig.autoFocus = true;
         const dialogRef = this.dialog.open(ModalEliminar , {
           hasBackdrop:true,
           width:"25%",
           height:"35%",
           data: row
         });
         dialogRef.afterClosed().subscribe(result => {
           if(result){
            this._tipo.crudTipo({idtipo:row.idtipo,
              nombre:row.nombre,
              opcion:'3'}).subscribe(data=>{
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
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <div class="w3-row  w3-green">
          <div class="w3-col" style="width:85%">
              <h1 mat-card-title >Eliminar Tipo</h1>
                  </div>
                  <div class="w3-col " style="width:10%">
                      <button class="mi-boton-salir w3-mobile"  (click)="clickCancelar()" mat-icon-button  >
                      <mat-icon>clear</mat-icon>
                  </button>
       </div>
                 
    </div>
  <div mat-dialog-content>
  <p >¿Está seguro que desea eliminar " {{titulo}} "?</p>
  <p>Presione aceptar para confirmar</p>
</div>
<mat-divider></mat-divider>
<div mat-dialog-actions align="center">
  <button mat-button (click)="clickAceptar()" tabindex="-1">Aceptar</button>
</div>
  
  `
})

export class ModalEliminar  {
  // public desc=this.data[0]._info_desc;
  public titulo=this.data.nombre;
  // public estado=this.data[0]._info_id;
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


