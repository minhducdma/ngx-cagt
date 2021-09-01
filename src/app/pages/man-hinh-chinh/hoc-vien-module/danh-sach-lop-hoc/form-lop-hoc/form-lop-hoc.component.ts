import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseListComponent } from '../../base/base-list.component';
import { ILopHoc } from '../../model/lop-hoc-model';

@Component({
    selector: 'app-form-lop-hoc',
    templateUrl: './form-lop-hoc.component.html',
    styleUrls: ['./form-lop-hoc.component.scss']
})
export class FormLopHocComponent extends BaseListComponent<ILopHoc> implements OnInit {
    getLopHocUrl = UrlConstant.ROUTE.LOP_HOC_GETID;
    lopId: number;

    constructor(
        injector: Injector,
        private route: ActivatedRoute,
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
        this.lopId = this.route.snapshot.params.lopId;
        if(this.lopId > 0){
            this.apiService.get(this.getLopHocUrl + '/' + this.lopId).subscribe((res) => {
            })
        }
        this.createForm();
        //this.setFormValue(this.model);
    }

    onSubmit() {
        throw new Error('Method not implemented.');
    }

    backToList() {
        this.router.navigate(["/pages/admin/quan-ly-hoc-vien/danh-sach-lop-hoc"]);
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
