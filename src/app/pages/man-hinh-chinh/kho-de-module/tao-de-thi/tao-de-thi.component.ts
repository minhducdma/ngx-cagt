import { IDeThi } from './../model/tao-de-thi.model';
import { Component, Injector, OnInit } from '@angular/core';
import { ICauHoi, IDapAn } from '../model/tao-de-thi.model';
import 'ckeditor';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { FormGroup, Validators } from '@angular/forms';
import { DropDownListEnum } from '../../../../shared/controls/cagt-select/cagt.data';
import { FormUtil } from '../../../../shared/utils/form';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../base/base-list.component';

@Component({
    selector: 'ngx-tao-de-thi',
    templateUrl: './tao-de-thi.component.html',
    styleUrls: ['./tao-de-thi.component.scss']
})
export class TaoDeThiComponent extends BaseListComponent<IDeThi> {
    
    url: string = UrlConstant.ROUTE.CREATE_DE_THI;
    getDeThiUrl = UrlConstant.ROUTE.GET_UPDATE_DE_THI;
    getDeThiId = UrlConstant.ROUTE.GET_DE_THI_ID;

    public expandedKeys: number[] = [1];
    public dataCauHoi: ICauHoi[] = [];
    public dataDeThi: IDeThi;
    dropdownListEnum = DropDownListEnum;
    form: FormGroup;
    selectedCauHoi: ICauHoi;
    tenCauHoi: string = "";
    ckConfig = config.basicOption;
    ckConfig2 = config.other1Option;
    deThiId: number;

    constructor(
        injector: Injector, private route: ActivatedRoute
    ) {
        super(injector)
    }

    ngOnInit() {
        this.deThiId = this.route.snapshot.params.deThiId;
        if (this.deThiId > 0) {
            this.apiService.get(this.getDeThiId + this.deThiId).subscribe(res =>{
                this.form.patchValue(res);
            })

            this.apiService.post(this.getDeThiUrl + '/' + this.deThiId, this.deThiId).subscribe((res) => {
                this.dataCauHoi = JSON.parse(JSON.stringify(res));
            })
        }
        super.ngOnInit();
    }

    protected showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
    }
    protected loadItems() {
        this.createForm();
        this.addCauHoi();
        this.showCauHoi(this.dataCauHoi[0]);
        this.addCauTraLoi(this.dataCauHoi[0]);
    }

    addCauHoi() {
        let cauhoi = {
            id: 0,
            parentId: 0,
            codeCauHoi: "",
            tenCauHoi: this.tenCauHoi,
            noiDungCauHoi: "",
            chiaSeUsers: "all",
            loaiCauHoi: "",
            trangThaiCauHoi: "",
            tongSoDiem: 0,
            tongThoiGian: 0,
            metadata: "",
            dapAns: [],
            items: []
        } as ICauHoi;
        this.dataCauHoi.push(cauhoi);
    }
    selectCauHoi(data) {
        console.log(data);
    }

    removeCauHoi(dataItem: ICauHoi[], item: ICauHoi) {
        dataItem.map(i => {
            const index = dataItem.indexOf(item, 0);
            if (index > -1) {
                dataItem.splice(index, 1);
            }
            else if (i.items != null && i.items.length > 0)
                this.removeCauHoi(i.items, item)
        })
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            tenDeThi: [null, Validators.required],
            loaiDeThi: [null, Validators.required],
            tongThoiGian: [null, Validators.required],
            tongSoDiem: [null, Validators.required],
            trangThaiDeThi: [null, Validators.required],
        });
    }

    saveListCauHoi() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            this.notification.show('Nhập đầy đủ các trường dữ liệu bắt buộc', 'Cảnh báo', { status: 'warning' });
            return;
        }
        let obj = {
            deThi: this.form.value,
            cauHois: this.dataCauHoi
        };
        this.apiService
            .post(this.url, obj)
            .subscribe(res => {
                this.notification.show('Thành công', 'Lưu thành công', { status: 'success' });
                this.router.navigate(["/pages/admin/kho-de/de-thi"]);
            });
    }

    showCauHoi(item) {
        this.selectedCauHoi = item as ICauHoi;
    }

    addCauTraLoi(item: ICauHoi) {
        let dapAn = {
            cauHoiId: item.id,
            noiDungCauHoi: "",
            isDapAnDung: false,
            id: 0
        } as IDapAn;
        this.selectedCauHoi.dapAns.push(dapAn);
    }
    removeCauTraLoi(item: IDapAn) {
        const index = this.selectedCauHoi.dapAns.indexOf(item, 0);
        if (index > -1) {
            this.selectedCauHoi.dapAns.splice(index, 1);
        }
    }
    backToList(){
        this.router.navigate(["/pages/admin/kho-de/de-thi"]);
    }
}
