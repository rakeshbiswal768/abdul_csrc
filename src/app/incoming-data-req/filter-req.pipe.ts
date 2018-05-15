import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReq',
  pure: false
})
export class FilterReqPipe implements PipeTransform {

  transform(value: any[], filterBy: string): any {

    if (filterBy.toLowerCase() === 'new' || filterBy.toLowerCase() === 'showall') {

      return filterBy ? value.filter((req) =>
        req.requestStatus.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
        || req.requestStatus.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
        || filterBy.replace(' ', '') === 'showall' || filterBy === '') : value;
    }
    else if (filterBy === 'inprogress' || filterBy === 'pendingapproval') {
      filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
      return filterBy ? value.filter((req) =>
        req.requestStatus.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
        || req.requestStatus.replace(' ', '').toLowerCase() === 'inprogress'
        || req.requestStatus.replace(' ', '').toLowerCase() === 'pendingapproval'
        || req.requestStatus.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
        || filterBy.replace(' ', '') === 'showall' || filterBy === '') : value;
    }
    else if (filterBy === 'completed') {
      filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
      return filterBy ? value.filter((req) =>
        req.requestStatus.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
        || req.requestStatus.replace(' ', '').toLowerCase() === 'receivedbyconsumer'
        || req.requestStatus.replace(' ', '').toLowerCase() === 'downloadedbyconsumer'
        || req.requestStatus.replace(' ', '').toLowerCase() === 'approved'
        || req.requestStatus.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
        || filterBy.replace(' ', '') === 'showall' || filterBy === '') : value;
    }
    else if (filterBy === 'problem') {
      filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
      return filterBy ? value.filter((req) =>
        req.requestStatus.replace(' ', '').toLowerCase() === filterBy.replace(' ', '').toLowerCase()
        || req.requestStatus.replace(' ', '').toLowerCase() === 'cancelled'
        || req.requestStatus.replace(' ', '').toLowerCase() === 'incomplete'
        || req.requestStatus.replace(' ', '').toLowerCase() === 'rejected'
        || req.requestStatus.replace(' ', '').toLowerCase().indexOf(filterBy.replace(' ', '').toLowerCase()) !== -1
        || filterBy.replace(' ', '') === 'showall' || filterBy === '') : value;
    }

  }
}
