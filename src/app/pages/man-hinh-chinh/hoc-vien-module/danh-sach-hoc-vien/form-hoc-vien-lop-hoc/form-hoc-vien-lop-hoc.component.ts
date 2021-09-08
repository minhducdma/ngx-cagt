import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { BaseFormComponent } from '../../base/base-form.component';
import { IHocVienLopHoc } from '../../model/hoc-vien-lop-hoc-model';
import { IHocVien } from '../../model/hoc-vien-model';

@Component({
    selector: 'app-form-hoc-vien-lop-hoc',
    templateUrl: './form-hoc-vien-lop-hoc.component.html',
    styleUrls: ['./form-hoc-vien-lop-hoc.component.scss']
})
export class FormHocVienLopHocComponent extends BaseFormComponent<IHocVienLopHoc> implements OnInit {
    url: string = UrlConstant.ROUTE.HOC_VIEN_LOP_HOC;
    lopId: number = 0;

    constructor(
        injector : Injector
    ) { 
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
        console.log(this.model);
        if(this.action == ActionEnum.UPDATE){
            this.apiService
            .post(this.url + '/collect-hoc-vien-lop-hoc', {
                lopHocId: this.lopId,
                hocVienId: this.model.hocVienId
            })
            .subscribe(res => {
                console.log(res);
            });
        }
    }

    onSubmit() {
        this.form.get("lopHocId").setValue(this.lopId);
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                let isBaoLuu = this.form.get("isBaoLuu").value;
                if(isBaoLuu == null)
                    this.form.get("isBaoLuu").setValue(false);
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
            hocVienId: [null, Validators.required],
            lopHocId: [null, Validators.required],
            thoiGianJoinLop: [null, Validators.required],
            isBaoLuu: [null]
        });
    }
    chonHocVien(data:IHocVien){
        this.form.get("hocVienId").setValue(data.id);
    }
}
