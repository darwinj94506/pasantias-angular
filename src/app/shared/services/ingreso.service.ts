import{Injectable} from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'; 
import{Observable} from 'rxjs';
import{GLOBAL} from './global';

@Injectable()
export class IngresoService{
  public url:string;
  public identity;
  public token;

  constructor(private _http:Http){
    this.url=GLOBAL.url;
    }
    
    getTipo(id){
      return this._http.get(this.url+'getTipo/'+id).pipe(map(res=>res.json()));
    }
    getMaterialesSelect(idtipo){
      let params=JSON.stringify(idtipo);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getMaterialesSelect',params, {headers:headers})
      .pipe(map( res => res.json()));          
    }
    getProveedoresSelect(){
      // let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getProveedoresSelect', {headers:headers})
      .pipe(map( res => res.json()));          
    }
    getGarantiasSelect(idproveedor){ 
      let params=JSON.stringify(idproveedor);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.get(this.url+'getGarantiasSelect/'+idproveedor).pipe(map(res=>res.json()));
    
    }
    getListaTipos(){
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.get(this.url+'getTiposSelect', {headers:headers})
      .pipe(map( res => res.json()));          
    }
    
    getIdentity(){
      let identity=JSON.parse(localStorage.getItem('identity'));
      if(identity!="undefined"){
        this.identity=identity;
      }else{
        this.identity=null;
      }
      return this.identity;
    }


    getPaginarIngresos(parametros){
      let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getIngresos',params, {headers:headers})
      .pipe(map( res => res.json()));          
    }
    crudIngreso(ingreso) {
      console.log(ingreso);
       let params=JSON.stringify(ingreso);
       let headers=new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
       return this._http.post(this.url+'crudIngreso',params, {headers:headers})
                         .pipe(map( res => res.json()));               
       }
  
    totalIngreso() {
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getTotalIngresos', {headers:headers})
                        .pipe(map( res => res.json()));
    }
    getToken(){
      let token=localStorage.getItem('token');
      if(token!="undefined"){
        this.token=token;
      }else{
        this.token=null;
      }
      return this.token;
    }
  }



