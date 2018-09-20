import { Component,OnInit,Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import{IngresoService} from './../../../shared/services/ingreso.service';
import {MatDialog, MatDialogRef, 
  MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
  import{ModalCrudIngresoComponent} from './../modal-crud-ingreso/modal-crud-ingreso.component';

  @Component({
  selector: 'app-listar-ingreso',
  templateUrl: './listar-ingreso.component.html',
  styleUrls: ['./listar-ingreso.component.scss']
})
export class ListarIngresoComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 50;
  cargando=false;
  displayedColumns: string[] = ['nombrematerial', 'cantidad', 'fechaingreso', 'nombreusuario', 'apellido', 'star'];
  ELEMENT_DATA: any[] = [];
  length=0;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _ingreso:IngresoService,public router: Router,
    public dialog: MatDialog, public snackBar: MatSnackBar) {}
  ngOnInit() {
    this.paginator.pageIndex=0;
    this.cargarTabla();  
  }
  cargarTabla(){
    this.cargando=true;
    this._ingreso.totalIngreso().
      subscribe((data)=>{
        this.length=data.data[0].count;
        console.log(data.data[0].count);
      });
    this._ingreso.getPaginarIngresos({"page":0, "itemsPerPage":10}) .subscribe((data)=>{
      this.ELEMENT_DATA=data.data;
      this.mode="determinate";
      this.cargando=false;
      console.log(this.ELEMENT_DATA);
      },error=>{
        this.mode="determinate";
        this.cargando=false;
        alert("Error en la transaccion");
       
      }
    )
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
    this._ingreso.getPaginarIngresos({"page":this.pageEvent.pageIndex,
                                "itemsPerPage":this.pageEvent.pageSize})
                                .subscribe((data)=>{
                                  this.ELEMENT_DATA=data.data;
                                  console.log(this.ELEMENT_DATA);                               
                                })
    }

    abrirModalCrear(data=null){
       const dialogRef = this.dialog.open(ModalCrudIngresoComponent , {
         hasBackdrop:true,
         width:"50%",
         height:"90%",
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
}
