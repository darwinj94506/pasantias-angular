import {Component,OnInit,Inject, ViewChild} from '@angular/core';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatSnackBar} from '@angular/material';
import{UserService} from './../../../shared/services/usuario.service';
import{BuscarUsuarioComponent} from '../buscar-usuario/buscar-usuario.component';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  cargando=false;
  active = true; 
  roles:any=[{
    "rol":1,
    "nombre":"funcionaro"
},{
    "rol":2,
    "nombre":"administrador"
}]; 
  myForm: FormGroup; 

  constructor(
    private _user:UserService,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      idusuario:'0',
      nombre:'',
      apellido:'',
      clave:'',
      cedula:'',
      rol:'',
      opcion:'1'
     
    })
    console.log(this.myForm);
    // if(this.data){
    //   // this.myForm.reset();
    //   this.myForm = this.fb.group({
    //     idusuario:this.data.usuario_id,
    //     nombre:this.data.nombre,
    //     apellido:this.data.apellido,
    //     clave:this.data.ci,
    //     rol:this.data.rol,
    //     opcion:'1' 
    //   })
      
    // }
  }

  crudUsuario(){
    this.cargando=true;
    console.log(this.myForm.value);
    this._user.crudUsuario(this.myForm.value).subscribe(data=>{
    console.log(data)
    this.cargando=false;
    this.close(data);
    },error=>{
       this.cargando=false;
   })
           
}
close(data) {
  this.dialogRef.close(data);
}

openBuscar(data=null):void{
  // this.dialogRef.close(data);
  console.log(this.myForm.value);
  const dialogRef = this.dialog.open( BuscarUsuarioComponent, {
    hasBackdrop:true,
    width:"60%",
    height:"70%",
   data:data

});
dialogRef.afterClosed().subscribe(result => {
 console.log(result);
 this.myForm = this.fb.group({
  idusuario:result.usuario_id,
  nombre:result.nombre,
  apellido:result.apellido,
  clave:result.ci,
  cedula:result.ci,
  rol:result.rol,
  opcion:'1' 
})
 
 
},error=>{
  console.log(error);
})

}


}


