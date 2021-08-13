import { Component, Injector, OnInit } from '@angular/core';
import { IKhachHang } from '../../model/khach-hang.model';
import {BaseKhachHangFormComponent} from '../../base/base-khach-hang-form.component'
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { FormUtil } from '../../../../shared/utils/form';
import { UrlConstant } from '../../../../@core/constants/url.constant';
@Component({
    selector: 'ngx-form-khach-hang',
    templateUrl: './form-khach-hang.component.html',
})
export class FormKhachHangComponent extends BaseKhachHangFormComponent<IKhachHang> implements OnInit {
    url: string = UrlConstant.ROUTE.KHACH_HANG;
    
    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    
    ngOnInit() {
        super.ngOnInit();
        switch(this.action){
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
                        alert("Lưu thành công!");
                        // close form
                        this.closeForm();
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(this.url + '/' + this.model.id.toString(), this.form.value)
                    .subscribe(res => {
                        // show notification
                        alert("Lưu thành công!");
                        // close form
                        this.closeForm();
                    });
                break;
        }
    }
    createForm() {
        debugger
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            hoTen: [null, Validators.required],
            ngaySinh: [null],
            gioiTinh: [null],
            diaChi: [null],
            soDienThoai: [null],
            email: [null],
            loaiKhachHang: [null],
        });
    }
}
