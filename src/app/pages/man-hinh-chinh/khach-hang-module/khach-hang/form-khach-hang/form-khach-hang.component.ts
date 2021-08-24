import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseFormComponent } from '../../base/base-form.component';
import { IKhachHang } from '../../model/khach-hang.model';
import { EKichBanCSKH } from '../../base/base.enum';
@Component({
    selector: 'ngx-form-khach-hang',
    templateUrl: './form-khach-hang.component.html',
})
export class FormKhachHangComponent extends BaseFormComponent<IKhachHang> implements OnInit {
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

                this.form.get('ngaySinh').setValue(this.formatDate(this.form.get('ngaySinh').value));

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
                        this.notification.show('Tạo mới thành công','Thành công', { status :'success' });
                        // close form
                        this.closeForm();
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(this.url + '/' + this.model.id.toString(), this.form.value)
                    .subscribe(res => {
                        // show notification
                        this.notification.show('Cập nhật thành công','Thành công', { status :'success' });
                        // close form
                        this.closeForm();
                    });
                break;
        }
    }
    createForm() { 
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            hoTen: [null, Validators.required],
            diaChi: [null, Validators.required],
            email: [null, Validators.required],
            soDienThoai: [null, Validators.required],
            ngaySinh: [null, Validators.required],
            nguonKhachHang: [null],
            loaiKhachHang: [null],
            nhanVienPhuTrach: [null],
            trangThaiKhachHang: [null],
            trinhDo: [null],
            taiKhoanMangXaHoi: [null],
            hoTenBo: [null, Validators.required],
            soDienThoaiBo: [null],
            emailBo: [null],
            hoTenMe: [null, Validators.required],
            soDienThoaiMe: [null],
            emailMe: [null],
            ghiChu: [null],
            quanTamDuHoc:[null],
            kichBanHienTai: EKichBanCSKH.KichBan1
        });
    }
}
