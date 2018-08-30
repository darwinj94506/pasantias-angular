import{Injectable} from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'; 
import{Observable} from 'rxjs';
import{GLOBAL} from './global';

@Injectable()
export class MaterialService{
  public url:string;
  public identity;
  public token;

  constructor(private _http:Http){
    this.url=GLOBAL.url;
    }
    
    getTipo(id){
      return this._http.get(this.url+'getTipo/'+id).pipe(map(res=>res.json()));
    }

    getMateriales(parametros){
      let params=JSON.stringify(parametros);
      let headers=new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'getMateriales',params, {headers:headers})
      .pipe(map( res => res.json()));          
    }

    crudTipo(tipo) {
      console.log(tipo);
       let params=JSON.stringify(tipo);
       let headers=new Headers({'Content-Type':'application/json'});
       return this._http.post(this.url+'crudTipo',params, {headers:headers})
                         .pipe(map( res => res.json()));
                         
       }
  
       getTotalMateriales() {
        // router.post('/api/getTotalTipos', db.getTotalTipos); 
         let headers=new Headers({'Content-Type':'application/json'});
         return this._http.post(this.url+'getTotalMateriales', {headers:headers})
                           .pipe(map( res => res.json()));
         }
     
    
  
  
  
   
   
  }



