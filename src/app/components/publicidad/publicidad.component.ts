import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss'],
  providers:[ApiService,UploadService]
})
export class PublicidadComponent implements OnInit {
  @ViewChild('modalupload') modalupload: ModalDirective;
  publicidad:FormGroup;
  imagensubir: any;
  ImagenTemp: string;
  imgTemp:any;
  resultId: any;
  avisos:any=[];

  constructor(private api:ApiService,private upload:UploadService) {
    this.publicidad= new FormGroup({
      id:new FormControl(1),
      titulo: new FormControl(null,Validators.required),    
      imagen:new FormControl(null)
    });
    this.getPublicidad();
   }

  ngOnInit() {
  }

  crearPublicidad(){
    this.modalupload.show();
    this.api.crearPublicidad(this.publicidad.value).subscribe((resp:any)=>{
      if(resp.ok==true){
        this.resultId=resp.results;
        let contenido="publicidad";  
        this.upload.subirArchivo(this.imagensubir,contenido,this.resultId).then((resp:any)=>{
          this.upload.notificacion.emit(resp);
          this.ImagenTemp="";
          this.modalupload.hide();
          this.publicidad.reset();  
          this.getPublicidad();                          
        }).catch((error)=>{
         console.log("error en la carga");
        });
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

  getPublicidad(){
    this.api.getPublicidad().subscribe((resp:any)=>{
      this.avisos= resp.results;
    });
  }
  eliminarPublicidad(id){
    this.api.eliminarPublicidad(id).subscribe((resp:any)=>{
      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Ok',
          text: 'Se ha Eliminado Correctamente!'          
        });
        this.getPublicidad();
      }

    });
  }


}
