import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { TbDirective } from './tb.directive';
import { TbItem } from './tb-item';
import { TbComponent } from './tb.component';
import { TempBuilderService } from './temp-builder.service';
import { SharedDataService } from '../shared-data.service';
import { Guid } from './guid';

@Component({
    selector: 'tb-template',
    template: `
                <ng-template tb-host></ng-template>
            `
})
export class TbTemplateComponent implements AfterViewInit {
    currentAddIndex = 0;
    viewContainerRef: any;
    @ViewChild(TbDirective) tbHost: TbDirective;
    subscription: any;


    constructor(private componentFactoryResolver: ComponentFactoryResolver, private tbService: TempBuilderService,
        private sharedData: SharedDataService) { }

    ngAfterViewInit() {
    }


    loadComponent(compType: string, data: any, eldataType, inComponent: boolean, value1?: any, value2?: any) {
        const tbItems = this.tbService.getTbs(compType);
        const tbItem = tbItems[this.currentAddIndex];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tbItem.component);
        this.viewContainerRef = this.tbHost.viewContainerRef;
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const item = {
            'id': compType, 'value': data === '' ? tbItem.data.value : data,
            'type': eldataType ? eldataType : tbItem.data.type,
            'inComponent': inComponent, 'order': tbItem.data.order,
            'guid': Guid.MakeNew(),
            'value1': value1 ? value1 : tbItem.data.value1,
            'value2': value2 ? value2 : tbItem.data.value2
        };
        (<TbComponent>componentRef.instance).data = item;

        this.sharedData.templateData.push(item);
    }

}
