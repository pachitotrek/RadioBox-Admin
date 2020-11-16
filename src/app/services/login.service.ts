import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Global } from './global';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url:String;
  token:String;
  usuario:string;


  constructor(private http:HttpClient,private router:Router) { 
    this.url= Global.url;
    this.cargarStorage();
  }


  Login(data):Observable<any>{

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type","application/json");

    return this.http.post(this.url+"admin",params,{headers:headers})
                    .map((resp:any)=>{
                      localStorage.setItem('token',resp.token);
                      localStorage.setItem('usuario',JSON.stringify(resp.usuario));

                      this.token=resp.token;

                      return true;
                    });
   }

   cargarStorage(){

        if(localStorage.getItem('token')){

          this.token=localStorage.getItem('token');
          this.usuario= JSON.parse(localStorage.getItem('usuario'));

        }else{
          this.token='';
          this.usuario=null;
        }


   }

   Logeado(){
     return (this.token.length > 5 ) ? true:false;
   }

   Logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    
   }









}
