import { Component, OnInit,OnChanges,OnDestroy,EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import{EgresoService} from './../../../shared/services/egreso.service';
import {FormBuilder, Validators, FormGroup,FormControl } from "@angular/forms";
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import{ModalAlertaComponent} from './../modal-alerta/modal-alerta.component';
import {MatDialog} from '@angular/material';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit,OnChanges {
  displayedColumns = ['posicion', 'material', 'cantidad','star'];
 // 
  // @Input() estadoDetalle: boolean=false;
  @Input() idDetalle:any;
  @Output() enviarAccionGuardar = new EventEmitter();
  
 ELEMENT_DATA: Element[] = [
  {posicion:1,iddetalle: null, idegreso: null, idmaterial:null,idingreso:1,cantidad:1,opcion:1}
];

dataSource = new MatTableDataSource(this.ELEMENT_DATA);
 //
  numero:number=1;
  materiales:any[]=[];
  myFormDetalle: FormGroup;
 
  constructor(private _egreso:EgresoService,private fb: FormBuilder,private _route:ActivatedRoute, private router:Router,
    public dialog: MatDialog){}
  ngOnInit() {
    this._egreso.getMaterialesSelect().subscribe((data)=>{
      console.log(data);
      this.materiales=data.data;
    },error=>{
    })
  }
  ngOnChanges(){ 
    if(this.idDetalle!=null && this.idDetalle!=0){ //es el id del egreso creado
      alert("llega el inut a detalle");
      var i=0;
      for (let i in this.ELEMENT_DATA){
        this.ELEMENT_DATA[i].idegreso=this.idDetalle;
      }

      this._egreso.crudDetalle2(this.ELEMENT_DATA).subscribe((data)=>{ //guarda el detalle del egreso
              console.log(data);
              this.router.navigate(['/modulo-egresos']);
          },error=>{
            alert("Error");
          })
    }
  }
  
  //
  funcionAsincrona(){
    let verif=0;
    var hazAlgo=new Promise((resolve,reject)=>{
      for (let i in this.ELEMENT_DATA){
        
        if(this.ELEMENT_DATA[i].cantidad!='' && this.ELEMENT_DATA[i].cantidad >0 && this.ELEMENT_DATA[i].idmaterial!=''){
          console.log("cumple");
         }else{
           verif++;
         }
      }
      resolve(verif);
    });
    return hazAlgo;
  }

  eliminar(element,i){
    if(this.ELEMENT_DATA[i].idmaterial!=null&&this.ELEMENT_DATA[i].idmaterial!=''){
      for(let j in this.materiales){
        if(this.materiales[j].idmaterial=== this.ELEMENT_DATA[i].idmaterial){
          this.materiales[j].estado=1;
        } 
      }
    }
    console.log(this.ELEMENT_DATA[i])
    this.ELEMENT_DATA.splice(i,1);
    console.log(this.ELEMENT_DATA);
    this.dataSource.data=this.ELEMENT_DATA;
  }
  lanzarAccionGuardar(){
    alert(this.ELEMENT_DATA[this.ELEMENT_DATA.length-1].cantidad);
    alert(this.ELEMENT_DATA[this.ELEMENT_DATA.length-1].idmaterial);

    if(this.ELEMENT_DATA[this.ELEMENT_DATA.length-1].cantidad ==null || this.ELEMENT_DATA[this.ELEMENT_DATA.length-1].idmaterial ==null){
      alert("No pueden haber espacios en blanco");
      // alert("no llega aqui");
      
    }else{
      console.log(this.ELEMENT_DATA);
      this._egreso.validarDetalle(this.ELEMENT_DATA).subscribe((data)=>{
      console.log(data);
      if(data._info_id){
        alert(data._info_id);
        this.enviarAccionGuardar.emit({accionGuardar:true});

      }else{
        this.abrirModal(data);
      }
    });
    }
  }
  materialCambiado;
  abrirSelect($event,i){
    this.materialCambiado=this.ELEMENT_DATA[i].idmaterial;
    
  }
  verificarCambio($event,i){
    console.log(this.materialCambiado);
      for(let j in this.materiales){
        if(this.materiales[j].idmaterial=== $event.value){
          this.materiales[j].estado=3;
        } 
        if(this.materialCambiado!=null&& this.materiales[j].idmaterial===this.materialCambiado){
          this.materiales[j].estado=1;
        }
      }
  }
  contador=1;
  verificador=0;
  agregar(){
    this.funcionAsincrona().then(data=>{
      if(data==0){
        this.ELEMENT_DATA.push({posicion:this.contador,iddetalle: null, idegreso: null,idmaterial:null,idingreso:1,cantidad:null,opcion:1});
        this.dataSource.data=this.ELEMENT_DATA;
        console.log(this.dataSource.data);
       

      }else{
        this.abrirModal('No pueden haber espacios en blanco para agregar un nuevo item');
      }
    })   
  }
  abrirModal(data=null){
    const dialogRef = this.dialog.open(ModalAlertaComponent , {
      hasBackdrop:true,
      width:"70%",
      height:"80%",
      data:data
    });
 }
}
export interface Element{
  posicion:any,
  iddetalle:any,
  idegreso:any,
  idmaterial:null
  idingreso:any,
  cantidad:any,
  opcion:any

}