import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmbedVideoService } from 'ngx-embed-video';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  providers:[ApiService]
})
export class StreamComponent implements OnInit {
  url_Video:any;
  url_Sonido:any;
  videoForm:FormGroup;
  audioForm:FormGroup;
  videoObject={
    id:"",
    url:""
  };
  audioObject={
    id:"",
    url:""
  };

  constructor(private api:ApiService,private embedService: EmbedVideoService) {
    this.videoForm= new FormGroup({
      id: new FormControl(this.videoObject.id),
      url:new FormControl(null,Validators.required)
    });
    this.audioForm= new FormGroup({
      id:new FormControl(null),
      url:new FormControl(null,Validators.required)
    });
    this.getVideoStream();
    this.getAudioStream();
  }

  ngOnInit() {  
  }

getVideoStream(){
  this.api.getVideo().subscribe((resp:any)=>{
    this.url_Video=resp.results[0].url; 
    this.videoObject=resp.results[0];
  });
}
getAudioStream(){
  this.api.getAudio().subscribe((resp:any)=>{
    this.url_Sonido=resp.results[0].url;
    this.audioObject=resp.results[0];
  });

}
setVideoUrl(){ 
  this.videoObject.url=this.videoForm.value.url;
  this.api.putVideo(this.videoObject).subscribe((resp:any)=>{
    if(resp.ok==true){
      Swal.fire({
        title: 'Exito!',
        text: 'Haz actualizado correctamente la dirección',
        type: 'success',
        confirmButtonText: 'Cool'
      });
      this.videoForm.reset();   
      this.getVideoStream();
    }
  });
}
setAudioUrl(){
  this.audioObject.url=this.audioForm.value.url;
  this.api.putAudio(this.audioObject).subscribe((resp:any)=>{
    if(resp.ok==true){
      Swal.fire({
        title: 'Exito!',
        text: 'Haz actualizado correctamente la dirección',
        type: 'success',
        confirmButtonText: 'Cool'
      });
      this.audioForm.reset();
      this.getAudioStream();
    }
  });
}


}
