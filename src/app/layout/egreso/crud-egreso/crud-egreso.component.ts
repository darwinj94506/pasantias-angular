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
  // displayedColumns = ['position', 'name', 'weight', 'symbol', 'fav'];
  displayedColumns = ['position', 'material', 'cantidad','star'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
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
    console.log(this.myForm.value);
    this.cargando=true;
    console.log(this.myForm.value);
    this._egreso.crudEgreso2(this.myForm.value).subscribe(data=>{
      console.log(data[0]._pk);
      this.cargando=false;
      //accionar la accion de guardar el detalle 
      // this.idDetalle=this.myForm.get('iddetalle').value;
      this.idDetalle=data[0]._pk;

      alert("guardado");
  },error=>{
    console.log(this.myForm.value);
    //accionar la accion de guardar el detalle 
    this.enviarEstado.emit({activar:false});
    alert("Error!!");

    this.cargando=false;
  })
}
  inicializarFormulario(){
    this.myForm = this.fb.group({
      idegreso:'0',
      idusuario:this.identity.idusuario,
      idsolicitante:'',
      memorando:['',Validators.maxLength(50)],
      observacion:['',Validators.maxLength(200)],
      opcion:'1'
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