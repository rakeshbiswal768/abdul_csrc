import { Type } from '@angular/core';

export class TbItem {
    constructor(public component: Type<any>, public data: any) { }
}
