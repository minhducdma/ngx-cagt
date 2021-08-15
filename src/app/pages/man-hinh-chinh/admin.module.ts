import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminsRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

@NgModule({
    imports: [
        ThemeModule,
        AdminsRoutingModule,
        CommonModule,
    ],
    declarations: [
        AdminComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
