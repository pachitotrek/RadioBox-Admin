import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss'],
  providers:[ApiService]
})
export class RedesComponent implements OnInit {
  red:FormGroup;
  redes:any=[];

  constructor(private api:ApiService) { 
    this.red= new FormGroup({
      nickname: new FormControl(null,Validators.required),
      url:new FormControl(null,Validators.required),
      tipo:new FormControl(null,Validators.required)
    });
    this.getRedes();
  }

  ngOnInit() {
  }

  agregarRed(){ 
    this.api.crearRedSocial(this.red.value).subscribe((resp:any)=>{
        if (resp.ok==true) {
          Swal.fire({
            type: 'success',
            title: 'Ok',
            text: 'Se ha Creado Correctamente!'          
          });         
          
        }
    });

  }
  eliminarRedes(id){
    this.api.eliminarRed(id).subscribe((resp:any)=>{
      if (resp.ok==true) {
        Swal.fire({
          type: 'success',
          title: 'Ok',
          text: 'Se ha Eliminado Correctamente!'          
        });   
        
        this.getRedes();
        
      }
    });
  }
  getRedes(){
    this.api.getRed().subscribe((resp:any)=>{
        this.redes=resp.results;
    });
  }

}
