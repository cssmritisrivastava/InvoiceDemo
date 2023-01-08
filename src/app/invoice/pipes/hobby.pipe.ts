import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hobby'
})
export class HobbyPipe implements PipeTransform {

  Hobbies: Array<any> = [
    { name: 'Singing', value: 'Singing' },
    { name: 'Dancing', value: 'Dancing' },
    
  ];
  transform(value: string, args?: any): any {
    //debugger
    let res = ' ';
    for (let i = 0; i < value.length; i++) {
      if (value[i] == '1') {
        res += this.Hobbies[i].name + ' ';
      }
    }
    return res;
  }

}
