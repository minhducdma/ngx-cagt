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
        console.log(this.value);
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
            case DropDownListEnum.LOAI_DE_THI:
                this.loadLoaiDeThi();
                break;
            case DropDownListEnum.TRANG_THAI_DE_THI:
                this.loadTrangThaiDeThi();
                break;
        }
    }

    loadLoaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=LoaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }

    loadNguonKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=nguonKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }
    loadTranngThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangThaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }
    loadLoaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=loaichamsoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }

    loadNhanVienPhuTrach() {
        this.apiService
            .get(UrlConstant.IDENTITY_BASE_URL)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    let data = res.items.map((x:any)=>{
                        return x.name;
                    })
                    this.lstData = data.filter(x=>x != null);
                }
            });
    }

    loadTrangThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangthaikhachhang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }
    loadTrangThaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=trangThaiChamSoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }
    loadLoaiDeThi() {
        this.apiService
            .get(this.url + `?tenBang=GetDeThis&tenCot=loaiDeThi`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }
    loadTrangThaiDeThi() {
        this.apiService
            .get(this.url + `?tenBang=GetDeThis&tenCot=trangThaiDeThi`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x=>x != null);
                }
            });
    }
}
