import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, Renderer2, Inject, forwardRef } from '@angular/core';
import { TbDirective } from './tb.directive';
import { TbItem } from './tb-item';
import { TbComponent } from './tb.component';
import { TempBuilderService } from './temp-builder.service';
import { SharedDataService } from '../shared-data.service';
import { Guid } from './guid';

@Component({
    selector: 'tb-acc-template',
    template: `<p-accordion>
    <p-accordionTab header="{{templateNameHeader}}">

        <div class="mt-5">
                <ng-template tb-host></ng-template>
                </div>


    </p-accordionTab>
</p-accordion>
            `
})
export class TbAccTemplateComponent implements AfterViewInit {
    currentAddIndex = 0;
    viewContainerRef: any;
    @ViewChild(TbDirective) tbHost: TbDirective;
    subscription: any;
    @Input()
    templateNameHeader = '';

    constructor(private componentFactoryResolver: ComponentFactoryResolver, @Inject(forwardRef(() => TempBuilderService))
    private tbService: TempBuilderService,
        private sharedData: SharedDataService, private renderer: Renderer2) { }

    ngAfterViewInit() {
    }


    loadComponent(compType: string, data: any, eldataType, inComponent: boolean, header: string, value1?: any, value2?: any) {
        const tbItems = this.tbService.getTbs(compType);
        const tbItem = tbItems[this.currentAddIndex];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tbItem.component);

        this.viewContainerRef = this.tbHost.viewContainerRef;

        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const item = {
            'id': compType, 'value': data === '' ? tbItem.data.value : data,
            'data': data === '' ? tbItem.data.data != null ? tbItem.data.data : tbItem.data : data,
            'type': eldataType ? eldataType : tbItem.data.type,
            'inComponent': inComponent,
            'order': tbItem.data.order,
            'guid': Guid.MakeNew(),
            'header': header,
            'value1': value1 ? value1 : tbItem.data.value1,
            'value2': value2 ? value2 : tbItem.data.value2
        };
        this.templateNameHeader = header;
        // this.renderer.setAttribute(componentRef._view.nodes['0'].renderElement, 'guid', item.guid);
        item.data.inComponent = true;
        (<TbComponent>componentRef.instance).data = item.data;

        if (compType !== 'addBtn') {
            this.sharedData.templateData.push(item);
        }
    }

}
