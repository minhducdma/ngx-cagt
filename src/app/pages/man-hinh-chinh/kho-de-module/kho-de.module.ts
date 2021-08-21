import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbAccordionModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { CKEditorModule } from 'ckeditor4-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormDirectiveModule } from '../../../shared/directives/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { KhoDeRoutingModule, routedComponents } from './kho-de-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CountdownModule } from '../../../shared/controls/count-down/count-down.module';

@NgModule({
    imports: [
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        KhoDeRoutingModule,
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
        NbAccordionModule
    ],
    declarations: [
        ...routedComponents,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KhoDeModule { }
