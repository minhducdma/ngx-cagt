import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CagtSelectComponent } from './cagt-select.component';
import { NbSelectModule } from '@nebular/theme';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
    declarations: [CagtSelectComponent],
    entryComponents: [CagtSelectComponent],
    imports: [
        CommonModule,
        NbSelectModule,
        NgSelect2Module
    ],
    exports: [
        CagtSelectComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]

})
export class CagtSelectModule {
}
