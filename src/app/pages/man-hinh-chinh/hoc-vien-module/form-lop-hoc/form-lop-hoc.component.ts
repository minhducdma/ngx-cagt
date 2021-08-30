import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from '../base/base-form.component';
import { BaseListComponent } from '../base/base-list.component';
import { ILopHoc } from '../model/lop-hoc-model';

@Component({
    selector: 'app-form-lop-hoc',
    templateUrl: './form-lop-hoc.component.html',
    styleUrls: ['./form-lop-hoc.component.scss']
})
export class FormLopHocComponent extends BaseListComponent<ILopHoc> implements OnInit {

    lopId: number;

    constructor(
        injector: Injector,
        private route: ActivatedRoute
    ) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
    }

    showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
    }

    loadItems() {
        this.model = {
            id: 1,
            maLopHoc: 'KTX 12',
            tenLopHoc: 'Anh văn 1',
            loaiLopHoc: 'Loại 1',
            trangThaiLopHoc: 'Đang mở',
            siSoToiDa: 40,
            isNgayChan: true,
            tongSoBuoi: 12,
            tongSoBaiKiemTra: 40,
            thoiGianBatDau: '2021-08-31',
            thoiGianKetThuc: '2021-09-30',
        };
        this.createForm();
        this.lopId = this.route.snapshot.params.lopId;
        this.setFormValue(this.model);
    }

    onSubmit() {
        throw new Error('Method not implemented.');
    }

    backToList() {

    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            maLopHoc: [null, Validators.required],
            tenLopHoc: [null, Validators.required],
            loaiLopHoc: [null, Validators.required],
            trangThaiLopHoc: [null, Validators.required],
            siSoToiDa: [null, Validators.required],
            isNgayChan: [null, Validators.required],
            tongSoBuoi: [null, Validators.required],
            tongSoBaiKiemTra: [null],
            thoiGianBatDau: [null, Validators.required],
            thoiGianKetThuc: [null, Validators.required],
        });
    }

}
