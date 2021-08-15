import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { UrlConstant } from '../../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../../shared/utils/form';
import { BaseFormComponent } from '../../../base/base-form.component';
import { ITrangThaiChamSoc } from '../../../model/trang-thai.model';

@Component({
  selector: 'ngx-trang-thai-cham-soc-2',
  templateUrl: './trang-thai-cham-soc-2.component.html',
  styleUrls: ['./trang-thai-cham-soc-2.component.scss']
})
export class TrangThaiChamSoc2Component 
extends BaseFormComponent<ITrangThaiChamSoc> implements OnInit {
  url: string = UrlConstant.ROUTE.KHACH_HANG_TRANG_THAI;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
  ngOnInit() {
    super.ngOnInit();
  }

  onSubmit() {
    if (this.form.invalid) {
      // trigger validate all field
      FormUtil.validateAllFormFields(this.form);
      return;
    }

    this.apiService
      .put(this.url, this.form.value)
      .subscribe(res => {
        // show notification
        this.notification.show('Thành công', 'Cập nhật thành công', { status: 'success' });
        // close form
        this.closeForm();
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      khachHangId: [null, Validators.required],
      nhanVienId: [null, Validators.required],
      ngayChamSoc: [''],
      urlDeThi: [''],
      ghiChu: [''],
      phanHoi: [''], 
    });
  }

}