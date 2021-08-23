import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../@core/constants/url.constant';
import { ApiService } from '../../../@core/services/api.service';
import { DropDownListEnum } from '../cagt-select/cagt.data';

@Component({
    selector: 'app-cagt-select-optionCrt',
    templateUrl: './cagt-select-optionCrt.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CagtSelectOptionCrtComponent),
        },
    ],
})


export class CagtSelectOptionCrtComponent implements OnInit {
    @Input() modeOfDropDowList: DropDownListEnum;
    url: string = UrlConstant.ROUTE.DANH_MUC;
    value: string;
    lstData = [];
    fixedLstDataStr: string = '';
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

    onSelectionChange(e: string) {
        this.writeValue(e);
        this.onChange(e);
    }

    onKeydownEvent(e) {
        if (e.keyCode == 13) {
            this.writeValue(e.target.value);
            this.onChange(e.target.value);
            this.lstData.push(e.target.value);
        }
    }
    removeItem(option) {
        const index = this.lstData.indexOf(option);
        if (index > -1) {
            this.lstData.splice(index, 1);
        }
    }
    ngOnInit() {
        switch (this.modeOfDropDowList) {
            case DropDownListEnum.LOAI_KHACH_HANG:
                this.loadLoaiKhachHang();
                break;
            case DropDownListEnum.NGUON_KHACH_HANG:
                this.loadNguonKhachHang();
                break;
            case DropDownListEnum.NHAN_VIEN_PHU_TRACH:
                this.loadNhanVienPhuTrach();
                break;
            case DropDownListEnum.TRANG_THAI_KHACH_HANG:
                this.loadTrangThaiKhachHang();
                break;
            case DropDownListEnum.LOAI_CHAM_SOC:
                this.loadLoaiChamSoc();
                break;
            case DropDownListEnum.TRANG_THAI_CHAM_SOC:
                this.loadTrangThaiChamSoc();
                break;
        }
    }

    loadLoaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=LoaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                    this.fixedLstDataStr = this.lstData.join(',');
                }
            });
    }

    loadNguonKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=nguonKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                    this.fixedLstDataStr = this.lstData.join(',');
                }
            });
    }
    loadTranngThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangThaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                    this.fixedLstDataStr = this.lstData.join(',');
                }
            });
    }
    loadLoaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=loaichamsoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                    this.fixedLstDataStr = this.lstData.join(',');
                }
            });
    }

    loadNhanVienPhuTrach() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=nhanVienPhuTrach`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                    this.fixedLstDataStr = this.lstData.join(',');
                }
            });
    }

    loadTrangThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangthaikhachhang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                    this.fixedLstDataStr = this.lstData.join(',');
                }
            });
    }
    loadTrangThaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=trangThaiChamSoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res;
                    this.fixedLstDataStr = this.lstData.join(',');
                }
            });
    }
}
