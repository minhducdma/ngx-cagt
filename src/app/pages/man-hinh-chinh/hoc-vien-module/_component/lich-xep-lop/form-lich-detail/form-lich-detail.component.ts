import { DatePipe } from '@angular/common';
import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../../shared/utils/form';
import { BaseFormComponent } from '../../../base/base-form.component';
import { ILichDetail } from '../../../model/lich-detail-model';

@Component({
    selector: 'app-form-lich-detail',
    templateUrl: './form-lich-detail.component.html',
    styleUrls: ['./form-lich-detail.component.scss']
})
export class FormLichDetailComponent extends BaseFormComponent<ILichDetail> implements OnInit, OnChanges {
    @Input() lichId: number = 0;
    @Input() thoiGianBatDau: string;
    @Input() thoiGianKetThuc: string;

    url = UrlConstant.ROUTE.LICH_DETAIL;

    constructor(
        injector: Injector,
    ) {
        super(injector)
    }

    ngOnChanges() {
    }

    ngOnInit() {
        super.ngOnInit();
        this.form.get("lichHocId").setValue(this.lichId);
        switch (this.action) {
            case ActionEnum.CREATE:
                if (this.thoiGianBatDau)
                    this.form.get("thoiGianBatDau").setValue(new Date(this.thoiGianBatDau));
                if (this.thoiGianKetThuc)
                    this.form.get("thoiGianKetThuc").setValue(new Date(this.thoiGianKetThuc));
                break;
            case ActionEnum.UPDATE:
                this.setFormValue(this.model);
                this.form.get("thoiGianBatDau").setValue(new Date(this.model.thoiGianBatDau));
                this.form.get("thoiGianKetThuc").setValue(new Date(this.model.thoiGianKetThuc));
                break;
        }
    }

    onSubmit() {
      
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if(this.isFailValidateRangeDate(this.form.get("thoiGianBatDau").value,this.form.get("thoiGianKetThuc").value)) return;
        this.form.get("thoiGianBatDau").setValue(this.convertCorrectDateTime(this.form.get("thoiGianBatDau").value));
        this.form.get("thoiGianKetThuc").setValue(this.convertCorrectDateTime(this.form.get("thoiGianKetThuc").value));

        switch (this.action) {
            case ActionEnum.CREATE:
                this.apiService
                    .post(this.url, this.form.value)
                    .subscribe(res => {
                        // show notification
                        this.notification.show('T???o m???i th??nh c??ng', 'Th??nh c??ng', { status: 'success' });
                        // close form
                        this.closeForm();
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(this.url + '/' + this.model.id.toString(), this.form.value)
                    .subscribe(res => {
                        // show notification
                        this.notification.show('C???p nh???t th??nh c??ng', 'Th??nh c??ng', { status: 'success' });
                        // close form
                        this.closeForm();
                    });
                break;
        }
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            lichHocId: [null],
            tenDatLich: [null, Validators.required],
            noiDungDatLich: [null],
            loaiDatLich: [null, Validators.required],
            trangThaiDatLich: [null, Validators.required],
            cssColor: [null],
            deThiId: 0,
            thoiGianBatDau: [null, Validators.required],
            thoiGianKetThuc: [null, Validators.required],
        });
    }

}
