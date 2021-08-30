import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbAccordionModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbToastrModule, NbTreeGridModule } from '@nebular/theme';
import { GridModule } from '@progress/kendo-angular-grid';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormDirectiveModule } from '../../../shared/directives/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { ControlErrorModule } from '../../../shared/controls/control-error/control-error.module';
import { CagtSelectModule } from '../../../shared/controls/cagt-select/cagt-select.module';
import { MatMenuModule } from '@angular/material/menu';
import { AlertDialogModule } from '../../../shared/controls/alert-dialog/alert-dialog.module';
import { CagtSelectCrtModule } from '../../../shared/controls/cagt-select-optionCrt/cagt-select-optionCrt.module'
import { HocVienRoutingModule, routedComponents } from './hoc-vien-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
const _component = [
]
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
]);
@NgModule({
    imports: [
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        HocVienRoutingModule,
        //Ng2SmartTableModule,
        GridModule,
        //DialogsModule,
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
        //TreeViewModule,
        CKEditorModule,
        NbCheckboxModule,
        DragDropModule,
        ControlErrorModule,
        CagtSelectModule,
        NbToastrModule,
        //DropDownsModule,
        MatMenuModule,
        NbAlertModule,
        NbTabsetModule,
        AlertDialogModule,
        NbAccordionModule,
        CagtSelectCrtModule,
        FullCalendarModule
    ],



    declarations: [
        ...routedComponents,
        ..._component
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HocVienModule { }
