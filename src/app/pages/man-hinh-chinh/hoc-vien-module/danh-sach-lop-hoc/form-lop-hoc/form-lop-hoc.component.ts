import { formatDate } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseListComponent } from '../../base/base-list.component';
import { ILopHoc } from '../../model/lop-hoc-model';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-form-lop-hoc',
    templateUrl: './form-lop-hoc.component.html',
    styleUrls: ['./form-lop-hoc.component.scss']
})
export class FormLopHocComponent extends BaseListComponent<ILopHoc> implements OnInit {
    getLopHocUrl = UrlConstant.ROUTE.LOP_HOC_GETID;
    lopId: number;
    lichDetail = [];
    lichId: number = 0;

    constructor(
        injector: Injector,
        private route: ActivatedRoute,
        public datepipe: DatePipe
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
            this.apiService.post(this.getLopHocUrl + '/' + this.lopId,{}).subscribe((res : any) => {
                if (res) {
                    this.form.patchValue(res.lopHocDTO);
                    this.lichDetail = res.lichDetailDTOs;
                    this.lichId = res.lichDTO.id;
                }
            })
        }
        this.createForm();
        //this.setFormValue(this.model);
    }

    onSubmit() {
        let thoiGianVaoLop = this.datepipe.transform(new Date(this.form.get("thoiGianVaoLopInput").value), 'HH:mm');
        this.form.get("thoiGianVaoLop").setValue(thoiGianVaoLop);

        let isNgayChan = this.form.get("isNgayChan").value;
        if(isNgayChan == null)
            this.form.get("isNgayChan").setValue(false);


        console.log(this.form.value);
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
            isNgayChan: [null],
            tongSoBuoi: [null, Validators.required],
            tongSoBaiKiemTra: [null],
            thoiGianBatDau: [null, Validators.required],
            thoiGianKetThuc: [null, Validators.required],
            thoiGianDiemDanh: [null],
            thoiGianVaoLopInput: [null, Validators.required],
            thoiGianVaoLop: [null],
            thoiGianTietHoc: [null]
        });
    }

    changeDataLichDetail(res){
        if(res)
            this.loadItems();
    }
}
