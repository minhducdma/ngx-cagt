import { NgModule } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GridModule } from '@progress/kendo-angular-grid';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminsRoutingModule, routedComponents } from './admin-routing.module';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
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




    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdminModule { }
