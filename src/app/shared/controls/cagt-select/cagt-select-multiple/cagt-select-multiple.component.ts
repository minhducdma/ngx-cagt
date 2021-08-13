import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { ApiService } from '../../../../@core/services/api.service';
import { DropDownListEnum } from '../cagt.data';

@Component({
    selector: 'ngx-cagt-select-multiple',
    templateUrl: './cagt-select-multiple.component.html',
    styleUrls: ['./cagt-select-multiple.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CagtSelectMultipleComponent),
        },
    ],
})
export class CagtSelectMultipleComponent implements ControlValueAccessor {
    @Input() modeOfDropDowList: DropDownListEnum;

    url: string = UrlConstant.ROUTE.DANH_MUC;
    value: string;
    lstData = [];
    reference: string;
    isDisabled: boolean;

    constructor(private apiService: ApiService) { }
        onChange(value) {}

    onTouched: () => void;
    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
    }

    handleOnProvinceChange(e) {
        this.writeValue(e);
        this.onChange(e);
      }
    ngOnInit() {
        switch (this.modeOfDropDowList) {
            case DropDownListEnum.LOAI_KHACH_HANG:
                this.loadLoaiKhachHang();
                break;
        }
    }

    loadLoaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=LoaiKhachHang`)
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                }
            });
    }

}
