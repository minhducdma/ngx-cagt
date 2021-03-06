import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseFormComponent } from '../../base/base-form.component';
import { IChamSocKhachHang } from '../../model/cham-soc-khach-hang.model';
import { EKichBanCSKH } from '../../base/base.enum';
@Component({
    selector: 'ngx-form-cham-soc-khach-hang',
    templateUrl: './form-cham-soc-khach-hang.component.html',
    styleUrls: ['./form-cham-soc-khach-hang.component.scss']
})
export class FormChamSocKhachHangComponent extends BaseFormComponent<IChamSocKhachHang> implements OnInit {
    url: string = UrlConstant.ROUTE.CHAM_SOC_KHACH_HANG;
    urlUpdate: string = UrlConstant.ROUTE.UPDATE_CHAM_SOC_KHACH_HANG;

    public get EKichBanCSKH(): typeof EKichBanCSKH {
        return EKichBanCSKH;
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    ngOnInit() {
        console.log(this.model)
        super.ngOnInit();
        switch(this.action){
            case ActionEnum.CREATE:
                this.setFormValue(this.model);
                break;
            case ActionEnum.UPDATE:
                this.setFormValue(this.model);
                this.form.get('ngayChamSocDuKien').setValue(this.formatDate(this.form.get('ngayChamSocDuKien').value));
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
                        this.notification.show('Tạo mới thành công','Thành công',  { status: 'success' });
                        // close form
                        this.closeForm();
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(this.urlUpdate, this.form.value)
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
            codeChamSoc: [null, Validators.required],
            noiDungChamSoc: [null, Validators.required],
            ngayChamSocDuKien: [null, Validators.required],
            feedBackKhahHang: [null],
            loaiChamSoc: [null],
            trangThaiChamSoc: [null, Validators.required],
            khachHangId: this.model.id,
            baiThiThuId: 0,
            requestXepLopId: 0,
            kichBanHienTai: [null],
            isChuyenKichBan: [null]
        });
    }

    chonDeThi(data){
        this.form.get('baiThiThuId').setValue(data.id);
    }
}
