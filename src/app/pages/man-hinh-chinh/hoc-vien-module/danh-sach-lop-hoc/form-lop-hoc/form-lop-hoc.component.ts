import { formatDate } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseListComponent } from '../../base/base-list.component';
import { ILopHoc } from '../../model/lop-hoc-model';
import { DatePipe } from '@angular/common';
import { FormUtil } from '../../../../../shared/utils/form';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
@Component({
    selector: 'app-form-lop-hoc',
    templateUrl: './form-lop-hoc.component.html',
    styleUrls: ['./form-lop-hoc.component.scss']
})
export class FormLopHocComponent extends BaseListComponent<ILopHoc> implements OnInit {
    getLopHocUrl = UrlConstant.ROUTE.LOP_HOC_GETID;
    url = UrlConstant.ROUTE.LOP_HOC_SAVE;
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
        if (this.lopId > 0) {
            this.apiService.post(this.getLopHocUrl + '/' + this.lopId, {}).subscribe((res: any) => {
                if (res) {
                    this.form.patchValue(res.lopHocDTO);
                    this.form.get('thoiGianBatDau').setValue(this.formatDate(res.lopHocDTO.thoiGianBatDau));
                    this.form.get('thoiGianKetThuc').setValue(this.formatDate(res.lopHocDTO.thoiGianKetThuc));
                    let timeArr = res.lopHocDTO.thoiGianVaoLop.split(':');
                    this.form.get("thoiGianVaoLopInput").setValue(new Date(0, 0, 0, timeArr[0], timeArr[1], 0));
                    this.lichDetail = res.lichDetailDTOs;
                    this.lichId = res.lichDTO.id;
                }
            })
        }
        this.createForm();
        //this.setFormValue(this.model);
    }

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        if (this.isFailValidateRangeDate(this.form.get("thoiGianBatDau").value, this.form.get("thoiGianKetThuc").value)) return;

        let thoiGianVaoLop = this.datepipe.transform(new Date(this.form.get("thoiGianVaoLopInput").value), 'HH:mm');
        this.form.get("thoiGianVaoLop").setValue(thoiGianVaoLop);

        let isNgayChan = this.form.get("isNgayChan").value;
        if (isNgayChan == null)
            this.form.get("isNgayChan").setValue(false);


        this.apiService
            .post(this.url, this.form.value)
            .subscribe((res) => {
                // show notification
                this.notification.show('Cập nhật thành công', 'Thành công', { status: 'success' });
                // close form
                setTimeout(() => {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigate(["/pages/admin/quan-ly-hoc-vien/edit-lop-hoc/" + res]);
                },1000);
            });
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
            thoiGianTietHoc: [null],
            lichDetails: []
        });
    }

    changeDataLichDetail(res) {
        if (res)
            this.loadItems();
    }

    onComplete(value) {
        this.opened = value;
    }
}
