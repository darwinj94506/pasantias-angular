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
  displayedColumns: string[] = ['nombre', 'idtipo', 'star'];
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
      this.cargando=true
      this._tipo.totalTipo().
        subscribe((data)=>{
          this.length=data.data[0].count;
        });
      this._tipo.getPaginarTipos({"page":0, "itemsPerPage":10}) .subscribe((data)=>{
       this.ELEMENT_DATA=data.data;
      this.mode="determinate";
        this.cargando=false;
      },error=>{
        this.mode="determinate";
        alert("Ha ocurrido un error");
        this.cargando=false;
        
      })

    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
    paginar(evento){
      this.pageEvent = evento;
      this._tipo.getPaginarTipos({"page":this.pageEvent.pageIndex,
                                  "itemsPerPage":this.pageEvent.pageSize})
                                  .subscribe((data)=>{
                                    this.ELEMENT_DATA=data.data;
                                  })
      }
      
      abrirModalCrear(data=null){
         const dialogRef = this.dialog.open(ModalCrearComponent , {
           hasBackdrop:true,
           width:"50%",
           height:"35%",
           data:data
         });
         dialogRef.afterClosed().subscribe(result => {
          if(result && result!=0){
            if(result[0]._info_id){
             this.cargarTabla();
           }
            this.openSnackBar(result[0]._info_desc,result[0]._info_titulo);
          }else{
            console.log("sin accion");
          }
       
        },error=>{
          console.log(error);
          alert("Ha ocurrido un error al cerrar Modal");
        })
      }
     
      eliminar(row){
         //modal
         const dialogConfig = new MatDialogConfig();
         dialogConfig.disableClose = true;
         dialogConfig.autoFocus = true;
         const dialogRef = this.dialog.open(ModalEliminar , {
           hasBackdrop:true,
           width:"45%",
           height:"35%",
           data: row
         });
         dialogRef.afterClosed().subscribe(result => {
           if(result){
            this._tipo.crudTipo({idtipo:row.idtipo,
              nombre:row.nombre,
              opcion:'3'}).subscribe(data=>{
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
  <div class="w3-row ">
  <mat-card-header style="justify-content: center">
  <div class="w3-col" style="width:85%">
                  <mat-card-title align="center">
                          <h4 class="m-0">Eliminar Tipo </h4>
                      </mat-card-title>
             
   </div>
          <div class="w3-col " style="width:10%">
              <button class="mi-boton-salir"  (click)="clickCancelar()" mat-icon-button  color="warn" >
              <mat-icon>clear</mat-icon>
          </button>
</div>
</mat-card-header>
         
</div>
  <div mat-dialog-content>
  <p >¿Está seguro que desea eliminar " {{titulo}} "?</p>
  <p>Presione aceptar para confirmar</p>
</div>
<mat-divider></mat-divider><p>
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
    this.dialogRef.close(true);
  }
  clickCancelar(): void { 
    this.dialogRef.close(false);
  }
}


