import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[tb-host]',
})
export class TbDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

