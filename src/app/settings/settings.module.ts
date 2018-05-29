import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { NgControl } from '@angular/forms';
import { DragDropModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { childRoutes } from './settings.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { TabsetComponent } from './tabset/tabset.component';
import { GeneralComponent } from './general/general.component';
import { CompanyComponent } from './company/company.component';
import { RolesComponent } from './roles/roles.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PlansComponent } from './plans/plans.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateBuilderComponent } from './template-builder/template-builder.component'
import { TbDirective } from './template-builder/tb.directive';
import { TempBuilderService } from './template-builder/temp-builder.service';
import { TbTemplateComponent } from './template-builder/tb-template.component';
import { AddressComponent } from './template-builder/items/address/address.component';
import { HeaderComponent } from './template-builder/items/header/header.component';
import { ShortTextComponent } from './template-builder/items/short-text/short-text.component';
import { LongTextComponent } from './template-builder/items/long-text/long-text.component';
import { NumberComponent } from './template-builder/items/number/number.component';
import { TableComponent } from './template-builder/items/table/table.component';
import { DateComponent } from './template-builder/items/date/date.component';
import { DateRangeComponent } from './template-builder/items/date-range/date-range.component';
import { FullNameComponent } from './template-builder/items/full-name/full-name.component';
import { EmailComponent } from './template-builder/items/email/email.component';
import { PhoneComponent } from './template-builder/items/phone/phone.component';
import { TbSettingsComponent } from './tb-settings/tb-settings.component';
import { RlTagInputModule } from 'angular2-tag-input';
import { BillingComponent } from './billing/billing.component';
import { ColorPickerModule } from 'primeng/primeng';
import { InputMaskModule, GrowlModule } from 'primeng/primeng';
import { DragulaModule } from 'ng2-dragula';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from './template-builder/dialog/dialog';
import { MatDialogModule } from '@angular/material/dialog';
// import { MessagesModule } from 'primeng/primeng';
// import { MessageModule } from 'primeng/primeng';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { InformationTypesComponent } from './templates/information-types/information-types.component';
import { PopoverModule } from 'ng2-popover';
import { RequestsComponent } from './requests/requests.component';
import { ClipboardDirective } from './requests/clipboard.directive';
import { ClipboardService } from './requests/clipboard.service';
import { JsonSchemaFormModule, MaterialDesignFrameworkModule } from 'angular2-json-schema-form';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChangePlanComponent } from './billing/change-plan/change-plan.component';
import { PlanPaymentComponent } from './billing/plan-payment/plan-payment.component';
import { DialogModule } from 'primeng/primeng';
import { SafePipe } from './billing/change-plan/safe.pipe';
import { TemplateWizardComponent } from './templates/template-wizard/template-wizard.component';
import { SelectSectorComponent } from './templates/select-sector/select-sector.component';
import { SelectInputFormsComponent } from './templates/select-input-forms/select-input-forms.component';
import { ReviewTagsComponent } from './templates/review-tags/review-tags.component';
import { TemplateStartEditComponent } from './templates/template-start-edit/template-start-edit.component';
import { MatStepperModule } from '@angular/material';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        childRoutes,
        MatCardModule,
        MatSlideToggleModule,
        NgbModule,
        DragDropModule,
        MatSidenavModule,
        RlTagInputModule,
        DataTableModule,
        SharedModule,
        ColorPickerModule,
        InputMaskModule,
        GrowlModule,
        DragulaModule,
        MatDialogModule,
        ConfirmDialogModule,
        PopoverModule,
        FlexLayoutModule,
        MaterialDesignFrameworkModule,
        JsonSchemaFormModule.forRoot(
            MaterialDesignFrameworkModule,
        ),
        DialogModule,
        MatStepperModule,
        CarouselModule
        // MessagesModule,
        // MessageModule
    ],
    exports: [
        RouterModule,
        TbDirective,
        TbTemplateComponent,
        AddressComponent,
        HeaderComponent,
        ShortTextComponent,
        LongTextComponent,
        NumberComponent,
        TableComponent,
        DateComponent,
        DateRangeComponent,
        FullNameComponent,
        EmailComponent,
        PhoneComponent,
        TbSettingsComponent
    ],
    providers: [
        TempBuilderService,
        MatDialog,
        ConfirmationService,
        ClipboardService
    ],
    entryComponents:
        [AddressComponent,
            HeaderComponent,
            ShortTextComponent,
            LongTextComponent,
            NumberComponent,
            TableComponent,
            DateComponent,
            DateRangeComponent,
            FullNameComponent,
            EmailComponent,
            PhoneComponent,
            Dialog
        ],
    declarations:
        [SettingsComponent,
            TabsetComponent,
            GeneralComponent,
            CompanyComponent,
            RolesComponent,
            MyProfileComponent,
            PlansComponent,
            TemplatesComponent,
            TemplateBuilderComponent,
            TbDirective,
            TbTemplateComponent,
            AddressComponent,
            HeaderComponent,
            ShortTextComponent,
            LongTextComponent,
            NumberComponent,
            TableComponent,
            DateComponent,
            DateRangeComponent,
            FullNameComponent,
            EmailComponent,
            PhoneComponent,
            TbSettingsComponent,
            BillingComponent,
            Dialog,
            OrderByPipe,
            InformationTypesComponent,
            RequestsComponent,
            ClipboardDirective,
            ChangePlanComponent,
            PlanPaymentComponent,
            SafePipe,
            TemplateWizardComponent,
            SelectSectorComponent,
            SelectInputFormsComponent,
            ReviewTagsComponent,
            TemplateStartEditComponent
        ],

})
export class SettingsModule { }
