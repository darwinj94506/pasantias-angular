import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import{UserService} from '../shared/services/usuario.service';
import {FormControl, Validators,FormBuilder,FormGroup, NgForm} from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cargando=false;
  active = true; 
    // public user:any;
    public identity;
    public token;
    public status:string;
    user: FormGroup; 
    constructor(private _route:ActivatedRoute, private router:Router,
                private _userService:UserService,private fb: FormBuilder) {}

    ngOnInit() {
        this.user= this.fb.group({
        idusuario:'',
        clave:''
      })}

    onLogin() {
      console.log(this.user.value);
      this.cargando=true;
        //loguear al usurio y conseguir el objeto
      this._userService.signup(this.user.value).subscribe(
        response=>{
          console.log(response);
          this.identity=response.user;
          if(!this.identity || !this.identity.idusuario){
            console.log("el usuario no se a logueado correctamente");
          }else{
            this.identity.clave='';
            //mostrar el identity
            localStorage.setItem('identity',JSON.stringify(this.identity));
            //conseguir el token
            this._userService.signup(this.user.value,'true').subscribe(
              response=>{
                this.token=response.token;
                if(this.token.length<=0 ){
                  console.log("el token no se a generado correctamente");
                  this.cargando=false;

                }else{//mostrar el token
                  this.cargando=false;

                  localStorage.setItem('token',this.token);
                  this.status='success';
                  this.router.navigate(['modulo-material']);
                }
              },
              error=>{
                console.log(<any>error);
                this.cargando=false;
              }
            );
          }
        },
        error=>{
          alert("Error de usuario o contraseña");
          console.log(error);
          var errorMessage=<any>error;
          if(errorMessage!=null){
            var body=JSON.parse(error._body);
            this.status='error';
          }
          this.cargando=false;

        }
      );
    }
}

