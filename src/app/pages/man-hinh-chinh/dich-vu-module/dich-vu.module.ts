import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbAccordionModule, NbAlertModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbToastrModule, NbTreeGridModule } from '@nebular/theme';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormDirectiveModule } from '../../../shared/directives/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { DichVuRoutingModule, routedComponents } from './dich-vu-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CountdownModule } from '../../../shared/controls/count-down/count-down.module';
import { CagtSelectModule } from '../../../shared/controls/cagt-select/cagt-select.module';
import { AlertDialogModule } from '../../../shared/controls/alert-dialog/alert-dialog.module';
import { CagtSelectCrtModule } from '../../../shared/controls/cagt-select-optionCrt/cagt-select-optionCrt.module';
import { MatMenuModule } from '@angular/material/menu';
import { CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: '.'
};

@NgModule({
    imports: [
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        DichVuRoutingModule,
        GridModule,
        DialogsModule,
        //TooltipModule,
        WindowModule,
        NbButtonModule,
        CommonModule,
        NbCheckboxModule,
        NbDatepickerModule,
        NbRadioModule,
        NbSelectModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectiveModule,
        NbDialogModule,
        TreeViewModule,
        CKEditorModule,
        NbCheckboxModule,
        //DragDropModule,
        ScrollingModule,
        CountdownModule,
        NbAlertModule,
        NbTabsetModule,
        NbAccordionModule,
        CagtSelectModule,
        NbToastrModule,
        NbButtonGroupModule,
        AlertDialogModule,
        CagtSelectCrtModule,
        MatMenuModule,
        CurrencyMaskModule
    ],
    declarations: [
        ...routedComponents,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DichVuModule { }
