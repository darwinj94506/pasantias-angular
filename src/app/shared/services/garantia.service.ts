import{Injectable} from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'; 
import{Observable} from 'rxjs';
import{GLOBAL} from './global';

@Injectable()
export class GarantiaService{
  public url:string;
  public identity;
  public token;

  constructor(private _http:Http){
    this.url=GLOBAL.url;
    }
    
    
   
    getListaProveedores(){
      // let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getListaProveedores', {headers:headers})
      .pipe(map( res => res.json()));          
    }

    getGarantias(parametros){
      let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getGarantias',params, {headers:headers})
      .pipe(map( res => res.json()));          
    }

    crudGarantia(tipo) {
      console.log(tipo);
       let params=JSON.stringify(tipo);
       let headers=new Headers({'Content-Type':'application/json'});
       return this._http.post(this.url+'crudGarantia',params, {headers:headers})
                         .pipe(map( res => res.json()));
                         
       }
  
       getTotalGarantias() {
        // router.post('/api/getTotalTipos', db.getTotalTipos); 
         let headers=new Headers({'Content-Type':'application/json'});
         return this._http.post(this.url+'getTotalGarantias', {headers:headers})
                           .pipe(map( res => res.json()));
         }
     
    
  
  
  
   
   
  }



