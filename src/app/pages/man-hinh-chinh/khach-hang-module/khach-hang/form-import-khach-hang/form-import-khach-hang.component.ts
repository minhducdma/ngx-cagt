import { Component, Injector, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseFormComponent } from '../../base/base-form.component';
import { IKhachHang } from '../../model/khach-hang.model';

@Component({
    selector: 'ngx-form-import-khach-hang',
    templateUrl: './form-import-khach-hang.component.html',
    styleUrls: ['./form-import-khach-hang.component.scss']
})
export class FormImportKhachHangComponent extends BaseFormComponent<IKhachHang> {

    linkExport: string = UrlConstant.ROUTE.TEMPLATE_FILE_IMPORT_KHACH_HANG;
    constructor(
        injector: Injector
    ) {
        super(injector)
    }

    ngOnInit() {
    }


    onSubmit() {
        throw new Error('Method not implemented.');
    }
    createForm() {
        throw new Error('Method not implemented.');
    }

    importHandler(file) {
        const formData: FormData = new FormData();
        formData.append('files', file[0]);
        this.apiService.upload(UrlConstant.ROUTE.FILE_IMPORT_KH, formData)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.notification.show('Upload File thành công', 'Thông báo', { status: 'success' });
            })
    }

    closeForm() {
        if (confirm("Bạn có chắc muốn hủy? ")) {
            this.windowRef.close();
        }
    }
}
