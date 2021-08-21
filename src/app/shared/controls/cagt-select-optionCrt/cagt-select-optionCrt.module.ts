import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAutocompleteModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { CagtSelectOptionCrtComponent } from './cagt-select-optionCrt.component';

@NgModule({
    declarations: [CagtSelectOptionCrtComponent],
    entryComponents: [CagtSelectOptionCrtComponent],
    imports: [
        CommonModule,
        NbAutocompleteModule,
        NbSelectModule,
        NbInputModule
    ],
    exports: [
        CagtSelectOptionCrtComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]

})
export class CagtSelectCrtModule {
}
