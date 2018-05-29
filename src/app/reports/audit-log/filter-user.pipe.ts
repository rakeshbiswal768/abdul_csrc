import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser',
  pure: false
})
export class FilterUserPipe implements PipeTransform {

  transform(value: any[], filterBy: string): any {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((req) =>
      req.systemUser.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
      || req.systemUser.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
      || filterBy === 'all users' || filterBy === 'select' || filterBy === '' || filterBy == null) : value;
  }

}
