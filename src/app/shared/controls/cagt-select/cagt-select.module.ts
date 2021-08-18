import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CagtSelectComponent } from './cagt-select.component';
import { NbSelectModule } from '@nebular/theme';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
    declarations: [CagtSelectComponent],
    entryComponents: [CagtSelectComponent],
    imports: [
        CommonModule,
        NbSelectModule,
        MatSelectModule
    ],
    exports: [
        CagtSelectComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]

})
export class CagtSelectModule {
}
