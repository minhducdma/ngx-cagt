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
    idHocVien: number = 0;

    constructor(
        injector : Injector
    ) { 
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.action == ActionEnum.UPDATE){
            this.apiService
            .post(this.url + '/collect-hoc-vien-lop-hoc?lopHocId='+this.lopId+'&hocVienId='+this.model.id, {})
            .subscribe((res : any) => {
                this.form.patchValue(res);
                this.form.get('thoiGianJoinLop').setValue(this.formatDate(res.thoiGianJoinLop));
                this.idHocVien = res.id;
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
                        this.notification.show('T???o m???i th??nh c??ng','Th??nh c??ng', { status :'success' });
                        // close form
                        this.closeForm();
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(this.url + '/' +  this.idHocVien, this.form.value)
                    .subscribe(res => {
                        // show notification
                        this.notification.show('C???p nh???t th??nh c??ng','Th??nh c??ng', { status :'success' });
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
