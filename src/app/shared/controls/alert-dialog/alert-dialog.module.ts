import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog.component';
import { NbButtonModule, NbCardModule, NbDialogModule } from '@nebular/theme';


@NgModule({
    declarations: [AlertDialogComponent],
    entryComponents: [AlertDialogComponent],
    imports: [
        CommonModule,
        NbDialogModule,
        NbButtonModule,
        NbCardModule
    ],
    exports: [
        AlertDialogComponent,
    ],

})
export class AlertDialogModule {
}
