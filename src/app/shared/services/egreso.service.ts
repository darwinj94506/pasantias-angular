import{Injectable} from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'; 
import{Observable} from 'rxjs';
import{GLOBAL} from './global';

@Injectable()
export class EgresoService{
  public url:string;
  public identity;
  public token;

  constructor(private _http:Http){
    this.url=GLOBAL.url;
    }
    getDetalleEgreso(idegreso){
      return this._http.get(this.url+'getDetalleEgreso/'+idegreso).pipe(map(res=>res.json()));      
    }
    
    getTipo(id){
      return this._http.get(this.url+'getTipo/'+id).pipe(map(res=>res.json()));
    }
    getStock(idmaterial){
      return this._http.get(this.url+'getStock/'+idmaterial).pipe(map(res=>res.json()));
    }
    getDetalles(idegreso){
      return this._http.get(this.url+'getDetalles/'+idegreso).pipe(map(res=>res.json()));
    }
    getMaterialesSelect(){
      // let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getMaterialesSelect', {headers:headers})
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
    getPaginarEgresos(parametros){
      let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getEgresosPaginacion',params, {headers:headers})
      .pipe(map( res => res.json()));          
    }

    validarDetalle(cuerpo){
      let params=JSON.stringify(cuerpo);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'validarDetalle',params, {headers:headers})
      .pipe(map( res => res.json()));          
    }

    crudEgreso(egreso) {
      console.log(egreso);
      let params=JSON.stringify(egreso);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'crudEgreso',params, {headers:headers})
                        .pipe(map( res => res.json()));               
    }
    crudEgreso2(egreso) {
      console.log(egreso);
      let params=JSON.stringify(egreso);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'crudEgreso2',params, {headers:headers})
                        .pipe(map( res => res.json()));               
    }
    crudDetalle(detalle) {
      console.log(detalle);
      let params=JSON.stringify(detalle);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'crudDetalle',params, {headers:headers})
                        .pipe(map( res => res.json()));               
    }
  
    getTotalEgreso() {
    // router.post('/api/getTotalTipos', db.getTotalTipos); 
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getTotalEgresos', {headers:headers})
                        .pipe(map( res => res.json()));
    }
    
    getUsuariosSelect(){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.post(this.url+'getUsuariosSelect',{headers:headers}).pipe(map(res=>res.json()))
      }
      
  }



