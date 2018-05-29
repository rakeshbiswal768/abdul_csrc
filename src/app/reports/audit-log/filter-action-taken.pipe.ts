import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterActionTaken'
})
export class FilterActionTakenPipe implements PipeTransform {

  transform(value: any[], filterBy: string): any {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((req) =>
      req.activityType.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
      || req.activityType.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
      || filterBy === '' || filterBy === 'select' || filterBy == null) : value;
  }

}
