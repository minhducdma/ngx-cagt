import { Component, Injector, OnInit } from '@angular/core';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { ICauHoi } from '../../../kho-de-module/model/tao-de-thi.model';
import { BaseFormComponent } from '../../base/base-form.component';
import { IChamThi, IChamThiDetail } from '../../model/cham-thi.model';

@Component({
    selector: 'app-form-cham-thi-phan-thi',
    templateUrl: './form-cham-thi-phan-thi.component.html',
    styleUrls: ['./form-cham-thi-phan-thi.component.scss']
})
export class FormChamThiPhanThiComponent extends BaseFormComponent<IChamThiDetail> implements OnInit {
    url: string = UrlConstant.ROUTE.SAVE_CHAM_THI;
    cauHoiTreeRoot: ICauHoi[] = [];
    lstChamThiDetail = [];
    chamThiInit: IChamThi;

    constructor(
        injector: Injector
    ) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
        this.convertToChamThiDetail();

    }

    convertToChamThiDetail() {
        if (this.cauHoiTreeRoot && this.cauHoiTreeRoot.length > 0) {
            this.cauHoiTreeRoot.map(x => {
                let chamThiDetail = {
                    id: 0,
                    chamThiId: this.chamThiInit?.chamThiId,
                    lamBaiThiId: this.chamThiInit?.lamBaiThiId,
                    cauHoiId: x.id,
                    nhanXet: "",
                    tenCauHoi: x.tenCauHoi
                };
                this.lstChamThiDetail.push(chamThiDetail);
            });
        }
    }

    onSubmit() {
        let isError = false;
        this.lstChamThiDetail.map(x => {
            if (x.nhanXet == "") {
                isError = true;
                return;
            }
        })

        if (!isError){
            if(this.lstChamThiDetail && this.lstChamThiDetail.length > 0)
                this.chamThiInit.noiDungChamThi = JSON.stringify(this.lstChamThiDetail);

            this.apiService
                .post(this.url, this.chamThiInit)
                .subscribe(res => {
                    this.notification.show('Thành công', 'Lưu thành công', { status: 'success' });
                });
            this.windowRef.close(true);
        }
        else
            this.notification.show('Cảnh báo', 'Nhập đầy đủ các trường nhập bắt buộc', { status: 'warning' });

    }
    createForm() {
    }

}


