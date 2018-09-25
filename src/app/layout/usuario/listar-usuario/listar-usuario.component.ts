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
  displayedColumns: string[] = [ 'nombre','apellido','cedula', 'rol','star'];
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
      this.cargando=true;
      this._user.getTotalUsuarios(). subscribe((data)=>{
          this.length=data.data[0].count;
          console.log(data.data[0].count);
        });
      this._user.getUsuarios({"page":0,"itemsPerPage":10}) .subscribe((data)=>{
        var paso;
        this.mode="determinate";
        this.cargando=true;
      // for (paso = 0; paso < this.length; paso++) {
      //   if(data.data[paso].rol==1){
      //     data.data[paso].rol="Funcionario";
      //   }else if(data.data[paso].rol==2){
      //     data.data[paso].rol="Administrador"
      //   }else{
      //     data.data[paso].rol="Ayudante"
      //   }
      // };
        this.ELEMENT_DATA=data.data;
      console.log(this.ELEMENT_DATA);
      this.cargando=false;
      
      },error=>{
        this.cargando=false;
        alert("Ha ocurrido un error");
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
      //funcion que permite editar un usuario
      openEditarDialog(row): void {
        const dialogRef = this.dialog.open(  EditarUsuarioComponent, {
            width: '30%',
           height:"87%",
            data:row
        });
        dialogRef.afterClosed().subscribe(result => {
        
          if(result && result!=0){
            console.log(result);
            if(result[0]._info_id){
             this.cargarTabla();
           }
            this.openSnackBar(result[0]._info_desc,result[0]._info_titulo);
          }else{
            console.log("no pasa nada");
          }
       
        },error=>{
          console.log(error);
          alert("Ha ocurrido un error al cerrar Modal");
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
      if(result && result!=0){
        console.log(result);
        if(result[0]._info_id){
         this.cargarTabla();
       }
        this.openSnackBar(result[0]._info_desc,result[0]._info_titulo);
      }else{
        console.log("no pasa nada");
      }
   
    },error=>{
      console.log(error);
      alert("Ha ocurrido un error al cerrar Modal");
    })
    
    }
      eliminar(row){
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
        console.log(result);
        if(result){
          
          this._user.crudUsuario({idusuario:row.idusuario,
            nombre:row.nombre,apellido:row.apellido,clave:row.clave,cedula:row.cedula,rol:row.rol,opcion:'3'}).subscribe(data=>{
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
  <div class="w3-row ">
                <mat-card-header style="justify-content: center">
                <div class="w3-col" style="width:85%">
                                <mat-card-title align="center">
                                        <h1 class="m-0">Eliminar Usuario</h1>
                                    </mat-card-title>
                           
                 </div>
                        <div class="w3-col " style="width:10%">
                            <button class="mi-boton-salir "  (click)="clickCancelar()" mat-icon-button  color="warn" >
                            <mat-icon>clear</mat-icon>
                        </button>
             </div>
            </mat-card-header>
                       
          </div>
<div mat-dialog-content>
<p>¿Está seguro que desea eliminar " {{titulo}} "?</p>
<p>Presione aceptar para confirmar</p>
</div>
<mat-divider></mat-divider >
<div mat-dialog-actions align="center">
  <button mat-button   (click)="clickAceptar()" tabindex="-1">Aceptar</button>
 
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


