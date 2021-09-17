import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { BaseFormComponent } from '../../base/base-form.component';
import { IBoSanPham } from '../../model/bo-san-pham.model';

@Component({
    selector: 'app-form-ql-bo-san-pham',
    templateUrl: './form-ql-bo-san-pham.component.html',
    styleUrls: ['./form-ql-bo-san-pham.component.scss']
})
export class FormQlBoSanPhamComponent extends BaseFormComponent<IBoSanPham> implements OnInit {
    url: string = UrlConstant.ROUTE.BO_SAN_PHAM;
    constructor(
        injector: Injector
    ) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
        switch (this.action) {
            case ActionEnum.CREATE:
                break;
            case ActionEnum.UPDATE:
                this.setFormValue(this.model);
                break;
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                this.apiService
                    .post(this.url, this.form.value)
                    .subscribe(res => {
                        // show notification
                        this.notification.show('Tạo mới thành công', 'Thành công', { status: 'success' });
                        // close form
                        this.closeForm();
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(this.url + '/' + this.model.id.toString(), this.form.value)
                    .subscribe(res => {
                        // show notification
                        this.notification.show('Cập nhật thành công', 'Thành công', { status: 'success' });
                        // close form
                        this.closeForm();
                    });
                break;
        }
    }
    createForm() {
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            ten: [null, Validators.required],
            loaiBoSanPham: [null],
            trangThaiBoSanPhams: [null]
        });
    }

}

