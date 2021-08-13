import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GridModule } from '@progress/kendo-angular-grid';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminsRoutingModule, routedComponents } from './admin-routing.module';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { ControlsModule } from '../../shared/controls/controls.module';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    AdminsRoutingModule,
    Ng2SmartTableModule,
    GridModule,
    DialogsModule,
    TooltipModule,
    WindowModule,
    NbButtonModule,
    ControlsModule,
    CommonModule
  ],
  declarations: [
    ...routedComponents,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
