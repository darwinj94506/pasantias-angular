import{Injectable} from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'; 
import{Observable} from 'rxjs';
import{GLOBAL} from './global';

@Injectable()
export class ProveedorService{
  public url:string;
  public identity;
  public token;

  constructor(private _http:Http){
    this.url=GLOBAL.url;
    }
    getTotalProveedores() {
        // router.post('/api/getTotalTipos', db.getTotalTipos); 
         let headers=new Headers({'Content-Type':'application/json'});
         return this._http.post(this.url+'getTotalProveedores', {headers:headers})
                           .pipe(map( res => res.json()));
         }
     getProveedores(parametros){
        let params=JSON.stringify(parametros);
        let headers=new Headers({'Content-Type':'application/json'});
        return this._http.post(this.url+'getProveedores',params, {headers:headers})
         .pipe(map( res => res.json()));          
     }

     crudProveedor(tipo) {
        console.log(tipo);
         let params=JSON.stringify(tipo);
         let headers=new Headers({'Content-Type':'application/json'});
         return this._http.post(this.url+'crudProveedor',params, {headers:headers})
                           .pipe(map( res => res.json()));
                           
         }
    
  }



