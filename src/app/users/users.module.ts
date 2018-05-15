import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material';
// import { SettingsModule } from '../../app/settings/settings.module'
import { childRoutes } from './users.router';
import { UsersComponent } from './users/users.component'
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AddDataManualComponent } from './add-data-manual/add-data-manual.component'
import { TempBuilderService } from './items/temp-builder.service'
import { CommonApiService } from '../api/common-api.service'
import { SharedDataService } from './shared-data.service'
import { TbDirective } from './items/tb.directive';
import { TbTemplateComponent } from './items/tb-template.component';
import { TbAccTemplateComponent } from './items/tb-Acctemplate.component';
import { AddressComponent } from './items/address/address.component';
import { HeaderComponent } from './items/header/header.component';
import { ShortTextComponent } from './items/short-text/short-text.component';
import { LongTextComponent } from './items/long-text/long-text.component';
import { NumberComponent } from './items/number/number.component';
import { TableComponent } from './items/table/table.component';
import { DateComponent } from './items/date/date.component';
import { DateRangeComponent } from './items/date-range/date-range.component';
import { FullNameComponent } from './items/full-name/full-name.component';
import { EmailComponent } from './items/email/email.component';
import { PhoneComponent } from './items/phone/phone.component';
import { RlTagInputModule } from 'angular2-tag-input';
import { DataTableModule, SharedModule, AccordionModule } from 'primeng/primeng';
import { ImportDataComponent } from './import-data/import-data.component';
import { RecordsComponent } from './import-data/records/records.component';
import { ImportedFilesComponent } from './import-data/imported-files/imported-files.component';
import { ImportFileComponent } from './import-file/import-file.component';
import { MatInputModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { FileUploadModule } from 'primeng/primeng';
import { PanelMenuModule, MenuItem, GrowlModule } from 'primeng/primeng';
import { DataEncrptComponent } from './import-data/data-encrpt/data-encrpt.component';
import { MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoriesDialog } from './import-data/imported-files/category-dialog/categories'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './client-details/profile/profile.component';
import { HistoryComponent } from './client-details/history/history.component';
import { AssigneesComponent } from './client-details/assignees/assignees.component';
import { ConversationsComponent } from './client-details/conversations/conversations.component';
import { TabViewModule } from 'primeng/primeng';
import { ClientService } from './client-details/client.service';
import { CalendarModule } from 'primeng/primeng';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FilterReqPipe } from './filter-req.pipe';
import { customFilterPipe } from '../shared/customFilter';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { DragulaModule } from 'ng2-dragula';
import { HttpModule } from '@angular/http';
import { AddButtonComponent } from './items/add-button/add-button.component';
import { AccordianComponent } from './items/accordian/accordian.component';
import { ConfirmDialogModule, ConfirmationService, DialogModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { InfoCategoriesComponent } from './info-categories/info-categories.component';
import { PopoverModule } from 'ng2-popover';
import { CrcComponent } from './crc/crc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        childRoutes,
        RlTagInputModule,
        DataTableModule,
        SharedModule,
        AccordionModule,
        NgbModule,
        MatExpansionModule,
        MatInputModule,
        TreeModule,
        MatStepperModule,
        FileUploadModule,
        PanelMenuModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        TabViewModule,
        CalendarModule,
        GrowlModule,
        AngularMultiSelectModule,
        DragulaModule,
        HttpClientModule,
        HttpModule,
        ConfirmDialogModule,
        InputTextareaModule,
        DialogModule,
        PopoverModule
    ],
    exports: [
        RouterModule
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
            CategoriesDialog,
            AddButtonComponent,
            AccordianComponent
        ],
    declarations: [
        UsersComponent,
        UserprofileComponent,
        AddDataManualComponent,
        TbDirective,
        TbTemplateComponent,
        TbAccTemplateComponent,
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
        ImportDataComponent,
        RecordsComponent,
        ImportedFilesComponent,
        ImportFileComponent,
        DataEncrptComponent,
        CategoriesDialog,
        ClientDetailsComponent,
        MessagesComponent,
        ProfileComponent,
        HistoryComponent,
        AssigneesComponent,
        ConversationsComponent,
        UserDetailsComponent,
        FilterReqPipe,
        customFilterPipe,
        AddButtonComponent,
        AccordianComponent,
        InfoCategoriesComponent,
        CrcComponent],
    providers: [
        TempBuilderService,
        SharedDataService,
        CommonApiService,
        MatDialog,
        ClientService,
        ConfirmationService
    ]
})
export class UsersModule { }
