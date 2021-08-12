import { Component, Injector, OnInit } from '@angular/core';
import { BaseKhachHangFormComponent } from '../base_khach_hang/base-khach-hang-form.component';
import { IKhachHang } from '../model/khach-hang.model';

@Component({
    selector: 'ngx-form-khach-hang',
    templateUrl: './form-khach-hang.component.html',
})
export class FormKhachHangComponent extends BaseKhachHangFormComponent<IKhachHang> implements OnInit {

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        console.log(this.model);
    }

    onSubmit() {
        this.windowRef.close();
    }
    createForm() {
        throw new Error('Method not implemented.');
    }

}
