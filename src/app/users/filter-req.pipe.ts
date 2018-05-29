import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReq',
  pure: false
})
export class FilterReqPipe implements PipeTransform {

  transform(value: any[], filterBy: string): any {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((req) =>
      req.latestRequestStatus.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
      || req.latestRequestStatus.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
      || filterBy.replace(' ', '') === 'showall' || filterBy === '') : value;
  }
}
