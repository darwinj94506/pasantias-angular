// import { Component, OnInit } from '@angular/core';
import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import{MaterialService} from './../../../shared/services/material.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  
    displayedColumns: string[] = [ 'nombretipo', 'nombre','stock', 'fecha','star'];
    ELEMENT_DATA: any[] = [];
    length=0;
    pageEvent: PageEvent;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _material:MaterialService,public router: Router,public dialog: MatDialog) {}
    ngOnInit() {
      this.paginator.pageIndex=0;
      this._material.getTotalMateriales().
        subscribe((data)=>{
          this.length=data.data[0].count;
          console.log(data.data[0].count);
        });
      this._material.getMateriales({"page":0,
                                  "itemsPerPage":10})
                                  .subscribe((data)=>{
                                    this.ELEMENT_DATA=data.data;
                                    console.log(this.ELEMENT_DATA);
                                  })
    }
    paginar(evento){
      this.pageEvent = evento;
      console.log(this.pageEvent.pageIndex);
      console.log(this.pageEvent.pageSize);
      this._material.getMateriales({"page":this.pageEvent.pageIndex,
                                  "itemsPerPage":this.pageEvent.pageSize})
                                  .subscribe((data)=>{
                                    this.ELEMENT_DATA=data.data;
                                    console.log(this.ELEMENT_DATA);                               
                                  })
      }
      // eliminar(row){
      //   console.log(row);


      //   this._material.getMateriales ({idtipo:row.idtipo,
      //                       nombre:row.nombre,
      //                       opcion:'3'}).subscribe(data=>{
          
      //     //modal
      //     const dialogRef = this.dialog.open(ModalEliminar , {
      //       width: '250px',
      //       data: data
      //     });
      //     dialogRef.afterClosed().subscribe(result => {
            
      //     },error=>{
      //     console.log(error);
      //   })
      // })
      // }   
}


@Component({
  selector: 'Modal-eliminar ',
  template: `
  <h1 mat-dialog-title>{{titulo}} </h1>
  <mat-divider></mat-divider>
<div mat-dialog-content>
  <p>{{desc}}</p>
  
</div>
<mat-divider></mat-divider>
<div mat-dialog-actions>
  <button mat-button (click)="clickAceptar()" tabindex="-1">Aceptar</button>
</div>
  
  `
})

export class ModalEliminar  {
  public desc=this.data[0]._info_desc;
  public titulo=this.data[0]._info_titulo;
  public estado=this.data[0]._info_id;


  constructor(
    public dialogRef: MatDialogRef<ModalEliminar>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  clickAceptar(): void { 
    console.log(this.data);
    this.dialogRef.close('lista-tipo');
  }
  
}


