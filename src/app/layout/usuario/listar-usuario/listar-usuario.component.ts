// import { Component, OnInit } from '@angular/core';
import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import{UserService} from './../../../shared/services/usuario.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{ActivatedRoute} from '@angular/router';

//dialogo modificar
import {  EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
//dialogo crear
import{   CrearUsuarioComponent}from '../crear-usuario/crear-usurio.component';
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 50;
  cargando=false;
    displayedColumns: string[] = [ 'nombre','apellido','rol','star'];
    ELEMENT_DATA: any[] = [];
    length=0;
    pageEvent: PageEvent;
  
 
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _user:UserService,public router: Router, public snackBar: MatSnackBar,
      public dialog: MatDialog) {
    }
    ngOnInit() {
      this.paginator.pageIndex=0;
      this.cargarTabla();
    }
    cargarTabla(){
      this._user.getTotalUsuarios(). subscribe((data)=>{
          this.length=data.data[0].count;
          console.log(data.data[0].count);
        });
      this._user.getUsuarios({"page":0,"itemsPerPage":10}) .subscribe((data)=>{
        var paso;
        this.mode="determinate";
        this.cargando=true;
      for (paso = 0; paso < this.length; paso++) {
        if(data.data[paso].rol==1){
          data.data[paso].rol="Funcionario";
        }else{
          data.data[paso].rol="Administrador"
        }
      };
        this.ELEMENT_DATA=data.data;
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
      this._user.getUsuarios({"page":this.pageEvent.pageIndex,
                                  "itemsPerPage":this.pageEvent.pageSize})
                                  .subscribe((data)=>{
                                    this.ELEMENT_DATA=data.data;
                                    console.log(this.ELEMENT_DATA);                               
                                  })
      }
      openEditarDialog(row): void {
        const dialogRef = this.dialog.open(  EditarUsuarioComponent, {
            width: '30%',
           height:"87%",
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
      const dialogRef = this.dialog.open(  CrearUsuarioComponent, {
        hasBackdrop:true,
        width:"35%",
        height:"75%",
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
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(ModalEliminar , {
        hasBackdrop:true,
        width:"40%",
        height:"35%",
        data: row
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result){
          this._user.crudUsuario({idusuario:row.idusuario,
            nombre:row.nombre,apellido:row.apellido,clave:row.clave,rol:row.rol,opcion:'3'}).subscribe(data=>{
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


