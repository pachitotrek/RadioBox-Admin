import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
  providers:[ApiService,UploadService]
})
export class NosotrosComponent implements OnInit {
  @ViewChild('modalupload') modalupload: ModalDirective;
  nosotros:FormGroup;
  imagensubir: any;
  ImagenTemp: string;
  informacion:any=[];
  imgTemp:any;
  

  constructor(private api:ApiService,private upload:UploadService) {
    this.nosotros= new FormGroup({
      id:new FormControl(1),
      titulo: new FormControl(null,Validators.required),
      texto:new FormControl(null,Validators.required),    
      imagen:new FormControl(null)
    });

    this.obtenerNosotros();
   }

  ngOnInit() {
  }
  obtenerNosotros(){
    this.api.getNosotros().subscribe((resp:any)=>{
      this.informacion= resp.results[0];    
    });
  }
  editarNosotros(){
    this.modalupload.show();
    this.api.editarNosotros(this.nosotros.value).subscribe((resp:any)=>{
        if(resp.ok==true){
          let id ="1"
          let contenido="nosotros";  
          this.upload.subirArchivo(this.imagensubir,contenido,id).then((resp:any)=>{
            this.upload.notificacion.emit(resp);
            this.ImagenTemp="";
            this.modalupload.hide();
            this.nosotros.reset();  
            this.obtenerNosotros();                   
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

  

}
