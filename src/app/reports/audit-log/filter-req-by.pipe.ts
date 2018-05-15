import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReqBy'
})
export class FilterReqByPipe implements PipeTransform {

  transform(value: any[], filterBy: string): any {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((req) =>
      req.consumerUser.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
      || req.consumerUser.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
      || filterBy === '' || filterBy === 'select') : value;
  }

}
