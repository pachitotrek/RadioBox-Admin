import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:String;
  constructor(private http:HttpClient) { 
    this.url=Global.url;
  }

  getAudio():Observable<any>{

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url+'audio',{headers:headers});
  }
  getVideo():Observable<any>{

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url+'video',{headers:headers});
  }
  putAudio(data):Observable<any>{

    let datos= JSON.stringify(data);

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url+'audio',datos,{headers:headers});
  }
  putVideo(data):Observable<any>{

    let datos= JSON.stringify(data)

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url+'video',datos,{headers:headers});
  }
  enviarCalendario(data):Observable<any>{
    
    let datos = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url+'evento',datos,{headers:headers});
  }
  actualizarCalendario(data):Observable<any>{
    
    let datos = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url+'evento',datos,{headers:headers});
  }
  getEvento():Observable<any>{

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url+'eventos',{headers:headers});
  }
  eliminarEvento(data):Observable<any>{
    
    let datos = JSON.stringify({"id":data});
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url+'devento',datos,{headers:headers});
  }
  
  editarNosotros(data):Observable<any>{
    
    let datos = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url+'nosotros',datos,{headers:headers});
  }
  getNosotros():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'nosotros',{headers:headers});
  }
  crearPublicidad(data):Observable<any>{

    let datos = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url+'publicidad',datos,{headers:headers});
  }
  eliminarPublicidad(data):Observable<any>{
    
    let datos = JSON.stringify({"id":data});
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url+'publicidad',datos,{headers:headers});
  }
  getPublicidad():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'publicidad',{headers:headers});
  }
  crearRedSocial(data):Observable<any>{
    let datos = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url+'red',datos,{headers:headers});
  }
  
  editarRed(data):Observable<any>{
    let datos = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url+'red',datos,{headers:headers});
  }
  
  eliminarRed(data):Observable<any>{
    
    let datos = JSON.stringify({"id":data});
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url+'deletered',datos,{headers:headers});
  }
  getRed():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'red',{headers:headers});
  }



}
