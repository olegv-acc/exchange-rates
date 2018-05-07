import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
   name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(baseCurr, value) {
    return baseCurr.filter(base => {
      return base.includes(value);
    });
  }}
