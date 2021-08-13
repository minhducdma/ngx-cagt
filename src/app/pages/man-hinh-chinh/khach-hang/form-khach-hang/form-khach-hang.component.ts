import { Component, Injector, OnInit } from '@angular/core';
import { IKhachHang } from '../../model/khach-hang.model';
import {BaseKhachHangFormComponent} from '../../base/base-khach-hang-form.component'
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
