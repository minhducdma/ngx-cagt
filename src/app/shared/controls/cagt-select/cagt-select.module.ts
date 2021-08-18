import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CagtSelectComponent } from './cagt-select.component';
import { NbSelectModule } from '@nebular/theme';

@NgModule({
    declarations: [CagtSelectComponent],
    entryComponents: [CagtSelectComponent],
    imports: [
        CommonModule,
        NbSelectModule
    ],
    exports: [
        CagtSelectComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]

})
export class CagtSelectModule {
}
