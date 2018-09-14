import{Injectable} from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'; 
import{Observable} from 'rxjs';
import{GLOBAL} from './global';
@Injectable()
export class UserService{
  public url:string;
  public identity;
  public token;
  public urlUsuarios:any= 'http://actividades.puyo.gob.ec/wsinventario';
  

  constructor(private _http:Http){
    this.url=GLOBAL.url;
    }

    getUsuariosdb(parametros) {
      console.log(parametros);
      let params=JSON.stringify(parametros);
       let headers=new Headers({'Content-Type':'application/json'});
       return this._http.post('http://actividades.puyo.gob.ec/wsinventario',params,{headers:headers})
                         .pipe(map( res => res.json()));
       }

    getTotalUsuarios() {
       let headers=new Headers({'Content-Type':'application/json'});
       return this._http.post(this.url+'getTotalUsuarios', {headers:headers})
                         .pipe(map( res => res.json()));
       }
       getUsuarios(parametros){
        let params=JSON.stringify(parametros);
        let headers=new Headers({'Content-Type':'application/json'});
        return this._http.post(this.url+'getUsuarios',params, {headers:headers})
         .pipe(map( res => res.json()));          
     }
     crudUsuario(tipo) {
      console.log(tipo);
       let params=JSON.stringify(tipo);
       let headers=new Headers({'Content-Type':'application/json'});
       return this._http.post(this.url+'crudUsuario',params, {headers:headers})
                         .pipe(map( res => res.json()));
                         
       }
//   register(user_to_register) {
//     let params=JSON.stringify(user_to_register);
//     let headers=new Headers({'Content-Type':'application/json'});
//     return this._http.post(this.url+'register',params, {headers:headers})
//                       .map( res => res.json());
//     }

    signup(user_to_login,gettoken=null){
      if(gettoken !=null){
        user_to_login.gettoken=gettoken;
      }
      let params=JSON.stringify(user_to_login);
      let headers = new Headers({'Content-Type':'application/json'});
      return this._http.post(this.url+'login',params,{headers:headers}).pipe(map(res=>res.json()))
                      
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

    getToken(){
      let token=localStorage.getItem('token');
      if(token!="undefined"){
        this.token=token;
      }else{
        this.token=null;
      }
      return this.token;
    }
    // updateUser(user_to_update){
    //   console.log("este toquen:"+this.getToken());
    //   let params=JSON.stringify(user_to_update);
    //   let headers= new Headers({
    //     'Content-Type':'application/json',
    //     'Authorization':this.getToken()
    //   });
    //   return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers:headers})
    //                                                         .map(res=>res.json());
    // }

    //  getKeepers(){
    //   return this._http.get(this.url+'keepers').map(res=>res.json());
    // }


}
