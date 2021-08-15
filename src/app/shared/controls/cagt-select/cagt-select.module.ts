import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CagtSelectComponent } from './cagt-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbSelectModule } from '@nebular/theme';


@NgModule({
    declarations: [CagtSelectComponent],
    entryComponents: [CagtSelectComponent],
    imports: [
        CommonModule,
        NgSelectModule,
        NbSelectModule
    ],
    exports: [
        CagtSelectComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]

})
export class CagtSelectModule {
}
