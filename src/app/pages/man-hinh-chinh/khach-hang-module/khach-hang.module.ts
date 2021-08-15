import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbToastrModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { CKEditorModule } from 'ng2-ckeditor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormDirectiveModule } from '../../../shared/directives/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { KhachHangRoutingModule, routedComponents } from './khach-hang-routing.module';
import { ControlErrorModule } from '../../../shared/controls/control-error/control-error.module';
import { CagtSelectModule } from '../../../shared/controls/cagt-select/cagt-select.module';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    KhachHangRoutingModule,
    Ng2SmartTableModule,
    GridModule,
    DialogsModule,
    TooltipModule,
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
    DragDropModule,
    ControlErrorModule,
    CagtSelectModule,
    NbToastrModule
  ],
  declarations: [
    ...routedComponents,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KhachHangModule { }
