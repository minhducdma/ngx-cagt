import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../@core/constants/url.constant';
import { ApiService } from '../../../@core/services/api.service';
import { DropDownListEnum } from './cagt.data';

@Component({
    selector: 'ngx-cagt-select',
    templateUrl: './cagt-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CagtSelectComponent),
        },
    ],
})
export class CagtSelectComponent implements ControlValueAccessor {
    @Input() modeOfDropDowList: DropDownListEnum;
    @Input() isMulti: Boolean;

    url: string = UrlConstant.ROUTE.DANH_MUC;
    value: string;
    lstData = [];
    reference: string;
    isDisabled: boolean;
    private readonly destroy$ = new Subject<void>();

    constructor(private apiService: ApiService) { }
    onChange(value) { }

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

    handleOnChange(e) {
        this.writeValue(e);
        this.onChange(e);
    }
    ngOnInit() {
        switch (this.modeOfDropDowList) {
            case DropDownListEnum.LOAI_KHACH_HANG:
                this.loadLoaiKhachHang();
                break;

            case DropDownListEnum.NGUON_KHACH_HANG:
                this.loadNguonKhachHang();
                break;
        }
    }

    loadLoaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=LoaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res
                }
            });
    }

    loadNguonKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=nguonkhachhang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res
                }
            });
    }

}