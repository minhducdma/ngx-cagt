import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { BaseFormComponent } from '../../base/base-form.component';
import { IBoSanPham } from '../../model/bo-san-pham.model';
import { ISanPham } from '../../model/san-pham.model';

@Component({
    selector: 'app-form-san-pham',
    templateUrl: './form-san-pham.component.html',
    styleUrls: ['./form-san-pham.component.scss']
})
export class FormSanPhamComponent extends BaseFormComponent<ISanPham> implements OnInit {
    url: string = UrlConstant.ROUTE.SAN_PHAM;
    dichVuId: number;
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
        this.form.get("dichVuId").setValue(this.dichVuId);
    }

    onSubmit() {
        let boSanPham = this.form.get("boSanPhamId").value;
        if(boSanPham == null)
            this.notification.show('Chọn Bộ sản phẩm', 'Cảnh báo', { status: 'warning' });

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
            dichVuId: [null],
            boSanPhamId: [null, Validators.required],
            codeSanPham: [null, Validators.required],
            tenSanPham: [null, Validators.required],
            loaiSanPham: [null],
            trangThaiSanPham: [null],
            giaBan: [null, Validators.required],
            phanTramThue: [null, Validators.required],
            giaGoc: [null, Validators.required],
            giaKhuyenMai: [null, Validators.required],
            noiDungMarketing: [null],
            baiThiThuId: [0],
        });
    }

    chonBoSanPham(data: IBoSanPham){
        if(data)
            this.form.get("boSanPhamId").setValue(data.id);
    }
}

