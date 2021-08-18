import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
})
export class AlertDialogComponent {
    title: string = "Xác nhận";
    message: string = "Bạn có chắc chắn?";

    constructor(protected ref: NbDialogRef<AlertDialogComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close(true);
    }
}
