import { Component, OnInit,OnDestroy,EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import{EgresoService} from './../../../shared/services/egreso.service';
import {FormBuilder, Validators, FormGroup,FormControl } from "@angular/forms";
@Component({
  selector: 'app-crud-egreso',
  templateUrl: './crud-egreso.component.html',
  styleUrls: ['./crud-egreso.component.scss']
})
export class CrudEgresoComponent implements OnInit  {
  
  displayedColumns = ['position', 'material', 'cantidad','star'];
 
  @Input() estado: boolean=false;
  @Output() enviarEstado = new EventEmitter();
  idDetalle;
  estadoEgreso=false;
  numero:number=0;
  usuarios:any[]=[];
  materiales:any[]=[];
  myForm: FormGroup; 
  myFormDetalle: FormGroup; 
  //
  cargando=false;
  active = true; 
  accion:number=1;
  identity:any;
  proveedores:any;
  garantias:any;
  constructor(private _egreso:EgresoService,private fb: FormBuilder){
    this.identity=this._egreso.getIdentity(); 
  }

  ngOnInit(){
    
    this._egreso.getUsuariosSelect().subscribe((data)=>{
      console.log(data);
      this.usuarios=data;
    },error=>{

    });
    this.inicializarFormulario();
  }
  lanzarEstado(){
    this.enviarEstado.emit({estado:this.estadoEgreso});
  }
  crudEgreso($even){
    alert(this.myForm.get('idsolicitante').value);
    if(this.myForm.get('idsolicitante').value===null){
      alert('No pueden haber espacios en blanco');
    }else{
    this.cargando=true;
    this._egreso.crudEgreso(this.myForm.value).subscribe(data=>{
      this.cargando=false;
      this.idDetalle=data[0]._pk;
  },error=>{
    this.enviarEstado.emit({activar:false});
    alert("Error!!");
    this.cargando=false;
  })

  }
    
}
  inicializarFormulario(){
    this.myForm = this.fb.group({
      idegreso:0,
      idusuario:this.identity.idusuario,
      idsolicitante:[null,Validators.required],
      memorando:['',Validators.maxLength(50)],
      observacion:['',Validators.maxLength(200)],
      opcion:1
    })
  }
  get idsolicitante() { return this.myForm.get('idsolicitante'); }

  getErrorMessage() {
    return this.myForm.get('idsolicitante').hasError('maxlength') ? 'Máximo 50 caracteres' :  
      this.myForm.get('idsolicitante').hasError('required') ? 'Campo obligatorio' :''      
  }
}



const ELEMENT_DATA: any[] = [
  
];