import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value?:boolean, args?: any): any {
    //debugger
    switch (value) {
      case true:
        return "male";
      case false:
        return "female" ;
      default:
        break;
    }
  }

}
