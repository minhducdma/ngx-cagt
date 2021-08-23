import { IDeThi } from './../model/tao-de-thi.model';
import { Component, Injector, OnInit } from '@angular/core';
import { ICauHoi, IDapAn } from '../model/tao-de-thi.model';
import '../../../../shared/controls/ckeditor-config/ckeditor.loader';
import 'ckeditor';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseFormComponent } from '../../khach-hang-module/base/base-form.component';
import { ApiService } from "../../../../@core/services/api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListEnum } from '../../../../shared/controls/cagt-select/cagt.data';
import { FormUtil } from '../../../../shared/utils/form';
import { NbToastrModule, NbToastrService } from '@nebular/theme';
@Component({
    selector: 'ngx-tao-de-thi',
    templateUrl: './tao-de-thi.component.html',
    styleUrls: ['./tao-de-thi.component.scss']
})
export class TaoDeThiComponent implements OnInit {
    url: string = UrlConstant.ROUTE.CREATE_DE_THI;
    private apiService: ApiService;
    protected formBuilder: FormBuilder;
    protected notification: NbToastrService;

    public expandedKeys: number[] = [1];
    public dataCauHoi: ICauHoi[] = [];
    public dataDeThi: IDeThi;
    dropdownListEnum = DropDownListEnum;
    form: FormGroup;
    selectedCauHoi: ICauHoi;
    tenCauHoi: string = "";
    ckConfig = config.basicOption;


    constructor(
        injector: Injector,
    ) {
        this.apiService = injector.get(ApiService);
        this.formBuilder = injector.get(FormBuilder);
        this.notification = injector.get(NbToastrService);
    }

    ngOnInit() {
        this.firstLoad();
    }

    firstLoad() {
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
            tenDeThi:  [null, Validators.required],
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
            this.notification.show('Nhập đầy đủ các trường dữ liệu bắt buộc','Cảnh báo', { status :'warning' });
            return;
        }
        let obj = {
            deThi: this.form.value,
            cauHois: this.dataCauHoi
        };

        console.log(obj);
        // this.apiService
        //     .post(this.url, obj)
        //     .subscribe(res => {
        //         // show notification
        //         alert("Thanh cong. Check du lieu xem nao")
        //         // this.notification.show('Success', 'Tạo mới thành công', { status: 'success' });
        //         // close form
        //     });
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
        console.log(this.selectedCauHoi);
    }
    removeCauTraLoi(item: IDapAn) {
        const index = this.selectedCauHoi.dapAns.indexOf(item, 0);
        if (index > -1) {
            this.selectedCauHoi.dapAns.splice(index, 1);
        }
    }
}
