import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(value, args: string[]): any {
    let filterArrays = [];
    for (let filterArray in value) {
      filterArrays.push(filterArray);
    }
    return filterArrays;
  }

}
