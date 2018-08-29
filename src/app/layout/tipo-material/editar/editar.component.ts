import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import{TipoMaterialService} from './../../../shared/services/tipo-material.service';
import{ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  cargando=false;
  active = true; 

  myForm: FormGroup; 
  idtipo:any;

  constructor(private _tipo:TipoMaterialService,private fb: FormBuilder,
    public dialog: MatDialog,private router: Router,private _router:ActivatedRoute) {
      this.idtipo=this._router.snapshot.paramMap.get('id');
      console.log(this.idtipo);
     }

  ngOnInit() {
    this.myForm = this.fb.group({
      idtipo:'0',
      nombre:'',
      opcion:'2' 
    })

    this._tipo.getTipo(this.idtipo).subscribe((data)=>{
      console.log(data)
      this.myForm = this.fb.group({
        idtipo:data.data[0].idtipo,
        nombre:data.data[0].nombre,
        opcion:'2' 
      })
    })
  }

  editarTipo(){
    this.cargando=true;
    console.log(this.myForm.value);
    this._tipo.crudTipo(this.myForm.value).subscribe(data=>{
      console.log(data)
      this.cargando=false;
      //modal
      const dialogRef = this.dialog.open(ModalEditar , {
        width: '250px',
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        // this.animal = result;
        if(result=='lista-tipo'){
          this.router.navigate(['modulo-tipo']); 
        }else{
          this.myForm.reset(this.myForm.value);
          this.active = false;
      }
      //modal
    },error=>{
      console.log(error);
    })
  })
}

eliminarTipo(){
  console.log(this.myForm.value);
  this._tipo.crudTipo(this.myForm.value).subscribe(data=>{
    console.log(data)
    this.cargando=false;
    //modal
    const dialogRef = this.dialog.open(ModalEditar , {
      width: '250px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // this.animal = result;
      if(result=='lista-tipo'){
        this.router.navigate(['modulo-tipo']); 
      }else{
        this.myForm.reset(this.myForm.value);
        this.active = false;
    }
    //modal
  },error=>{
    console.log(error);
  })
})
}



}

@Component({
  selector: 'Modal-editar',
  template: `
  
  <h1 mat-dialog-title>{{titulo}} </h1>
  <mat-divider></mat-divider>
<div mat-dialog-content>
  <p>{{desc}}</p>
  
</div>
<mat-divider></mat-divider>
<div mat-dialog-actions>
  <button mat-button (click)="clickAceptar()" tabindex="-1">Aceptar</button>
  <button mat-button (click)="clickNuevo()" tabindex="2">Nuevo</button>
</div>

`
})
export class ModalEditar  {
  public desc=this.data[0]._info_desc;
  public titulo=this.data[0]._info_titulo;
  public estado=this.data[0]._info_id;


  constructor(
    public dialogRef: MatDialogRef<ModalEditar>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  clickAceptar(): void { 
    console.log(this.data);
    this.dialogRef.close('lista-tipo');
  }
  clickNuevo(): void { 
    console.log(this.data);
    this.dialogRef.close("nuevo");
  }
}

