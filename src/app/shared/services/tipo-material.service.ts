import{Injectable} from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'; 
import{Observable} from 'rxjs';
import{GLOBAL} from './global';

@Injectable()
export class TipoMaterialService{
  public url:string;
  public identity;
  public token;

  constructor(private _http:Http){
    this.url=GLOBAL.url;
    }
    
    getTipo(id){
      return this._http.get(this.url+'getTipo/'+id).pipe(map(res=>res.json()));
    }

    getPaginarTipos(parametros){
      let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getTipos',params, {headers:headers})
      .pipe(map( res => res.json()));          
    }

    crudTipo(tipo) {
      console.log(tipo);
       let params=JSON.stringify(tipo);
       let headers=new Headers({'Content-Type':'application/json'});
       return this._http.post(this.url+'crudTipo',params, {headers:headers})
                         .pipe(map( res => res.json()));
                         
       }
  
       totalTipo() {
        // router.post('/api/getTotalTipos', db.getTotalTipos); 
         let headers=new Headers({'Content-Type':'application/json'});
         return this._http.post(this.url+'getTotalTipos', {headers:headers})
                           .pipe(map( res => res.json()));
         }
  }



