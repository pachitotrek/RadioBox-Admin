import { Pipe, PipeTransform } from '@angular/core';
import {Global} from '../services/global';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo:string ='usuario'): any {

    let url= Global.url+'img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'eventos':
        url += '/eventos/' + img;
      break;

      case 'nosotros':
        url += '/nosotros/' + img;
      break;

      case 'publicidad':
         url += '/publicidad/' + img;
      break;
      
      case 'redes':
         url += '/redes/' + img+'.png';
      break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }



    return url;
  }

}
