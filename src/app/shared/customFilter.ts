import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customFilter',
    pure: false
})
export class customFilterPipe implements PipeTransform {
    // transform(value: any[], args: any[]): any {
    //     return value.filter(filterVal => filterVal.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
    // }
      transform(value: any[], filterBy: string): any {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((req) =>
          req.name.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
          || req.name.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
          || filterBy.replace(' ', '') === 'showall' || filterBy === '') : value;
      }
}
