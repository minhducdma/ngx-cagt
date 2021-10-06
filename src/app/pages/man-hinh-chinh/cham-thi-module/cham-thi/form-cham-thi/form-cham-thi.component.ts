import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { BaseFormComponent } from '../../base/base-form.component';
import { IChamThiDetail } from '../../model/cham-thi.model';

@Component({
  selector: 'app-form-cham-thi',
  templateUrl: './form-cham-thi.component.html',
  styleUrls: ['./form-cham-thi.component.scss']
})
export class FormChamThiComponent extends BaseFormComponent<IChamThiDetail> implements OnInit {
    url: string = UrlConstant.ROUTE.BO_SAN_PHAM;
    chamThiDetail: IChamThiDetail;
    constructor(
        injector: Injector
    ) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
        this.form.patchValue(this.chamThiDetail);
    }

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        this.windowRef.close(this.form.value);
    }
    createForm() {
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            chamThiId: [null],
            lamBaiThiId: [null],
            cauHoiId: [null],
            nhanXet: [null, Validators.required],
        });
    }

}

