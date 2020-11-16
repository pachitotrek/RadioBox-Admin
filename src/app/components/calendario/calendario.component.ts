import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import { UploadService } from 'src/app/services/upload.service';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers:[ApiService,UploadService]
})
export class CalendarioComponent implements OnInit {
  @ViewChild('modalupload') modalupload: ModalDirective;
  calendario:FormGroup;
  eventos:any=[];
  imagensubir: File;
  ImagenTemp: string;
  resultId: any;
  imgTemp: any;
 

  constructor(private api:ApiService,private upload:UploadService) {
    this.calendario= new FormGroup({
      id:new FormControl(null),
      fecha: new FormControl(null,Validators.required),
      hora:new FormControl(null,Validators.required),
      titulo:new FormControl(null,Validators.required),
      descripcion:new FormControl(null,Validators.required),
      imagen:new FormControl(null)
    })
   }

  ngOnInit() {
    this.getEventos();
  }

  agregarEvento(){
    this.modalupload.show();
    this.api.enviarCalendario(this.calendario.value).subscribe((resp:any)=>{

      if(resp.ok==true){

        this.resultId=resp.results;
        let contenido="eventos";

        this.upload.subirArchivo(this.imagensubir,contenido,this.resultId).then((resp:any)=>{
          this.upload.notificacion.emit(resp);
          this.ImagenTemp="";
          this.getEventos();
          this.modalupload.hide();
          this.calendario.reset();

        }).catch((error)=>{
 
         console.log("error en la carga");
 
 
 
        });


  
        this.calendario.reset();

      }

    },error=>{

      Swal.fire({
        title: 'Error!',
        text: 'Contacte con soporte',
        type: 'error'       
      });

    });
   

  }
  getEventos(){

    this.api.getEvento().subscribe((resp:any)=>{

     this.eventos = resp.results;

    });
  }
  seleccionarEvento(item){
    this.imgTemp=item.imagen;

    this.calendario.setValue(item);
  }
  actualizarEvento(){
    this.modalupload.show();

    this.api.actualizarCalendario(this.calendario.value).subscribe((resp:any)=>{

      if(resp.ok==true){

        this.resultId=this.calendario.value.id;
        let contenido="eventos";

        this.upload.subirArchivo(this.imagensubir,contenido,this.resultId).then((resp:any)=>{
          this.upload.notificacion.emit(resp);
          this.ImagenTemp="";
          this.imgTemp="";
          this.getEventos();
          this.modalupload.hide();
          this.calendario.reset();

        }).catch((error)=>{ 
         console.log("error en la carga");
        });
        this.calendario.reset(); 
      }

    });

  }
  eliminarEvento(id){
    this.api.eliminarEvento(id).subscribe((resp:any)=>{
      if(resp.ok==true){

        Swal.fire({
          title: 'Ok!',
          text: 'Elemento Eliminado',
          type: 'success'       
        });

        this.getEventos();


      }
    });
  }
  seleccionImagen(archivo:File){

    if(!archivo){
      this.imagensubir=null;
      return;
    }

    if(archivo.type.indexOf('image')<0){
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Solo se aceptan Imagenes!'         
      })
    }  

    this.imagensubir=archivo;    

    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(archivo);

    reader.onloadend=()=>this.ImagenTemp=reader.result.toString();  
  }

  



}
