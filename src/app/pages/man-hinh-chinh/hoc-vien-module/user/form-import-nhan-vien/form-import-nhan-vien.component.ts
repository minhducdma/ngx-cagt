import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { BaseFormComponent } from '../../base/base-form.component';
import { IUser } from '../../model/user.model';

@Component({
    selector: 'app-form-import-nhan-vien',
    templateUrl: './form-import-nhan-vien.component.html',
    styleUrls: ['./form-import-nhan-vien.component.scss']
})
export class FormImportNhanVienComponent extends BaseFormComponent<IUser> implements OnInit {
    url: string = UrlConstant.ROUTE.ADD_UPDATE_NHAN_VIEN;
    
    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    ngOnInit() {
        super.ngOnInit();
        switch (this.action) {
            case ActionEnum.CREATE:
                break;
            case ActionEnum.UPDATE:
                
                this.setFormValue(this.model);
                this.form.get('ngaySinh').setValue(this.formatDate(this.form.get('ngaySinh').value));
                this.form.get('userName').setValue(this.model.userDetail.userName);
                this.form.get('email').setValue(this.model.userDetail.email);
                this.form.get('roles').setValue(this.model.userDetail.roles);
                this.form.get('surname').setValue(this.model.userDetail.surname);
                this.form.get('gioiTinh').setValue(this.model.gioiTinh.toString());
                // this.form.get('ngaySinh').setValue(this.formatDate(this.form.get('ngaySinh').value));

                break;
        }
    }
    onSubmit() {
        console.log(this.form.value);
        if (this.form.invalid) {

            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                if (this.form.get('password').value == this.form.get('passwordcf').value) {

                    this.apiService
                        .post(this.url, this.form.value)
                        .subscribe(res => {
                            // show notification
                            this.notification.show('Tạo mới thành công', 'Thành công', { status: 'success' });
                            // close form
                            this.closeForm();
                        });

                }


                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .post(this.url, this.form.value)
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
            userId: [null],
            surname: [null, Validators.required],
            soDienThoai: [null, Validators.required],
            gioiTinh: [null],
            maSoCanCuoc: [null, Validators.required],
            quocTich: [null, Validators.required],
            danToc: [null],
            tonGiao: [null],
            maSoThue: [null, Validators.required],
            soTaiKhoan: [null],
            tenTaiKhoan: [null],
            tenNganHang: [null],
            chiNhanhNganHang: [null],
            loaiNhanVien: [null],
            trangThaiNhanVien: [null],
            ngaySinh: [null, Validators.required],
            userName: [null, Validators.required],
            password: [null, Validators.required],
            passwordcf: [null, Validators.required],
            email: [null, Validators.required],
            roles: [
                [null]
            ]
        });

    }
}
