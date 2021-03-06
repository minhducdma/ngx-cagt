import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../@core/constants/url.constant';
import { ApiService } from '../../../@core/services/api.service';
import { ReportUtil } from '../../utils/report';
import { DropDownListEnum } from '../cagt-select/cagt.data';

@Component({
    selector: 'app-cagt-select-optionCrt',
    templateUrl: './cagt-select-optionCrt.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CagtSelectOptionCrtComponent),
            multi: true
        }
    ]
})


export class CagtSelectOptionCrtComponent implements ControlValueAccessor {
    @Input() modeOfDropDowList: DropDownListEnum;
    url: string = UrlConstant.ROUTE.DANH_MUC;
    value: string;
    lstData = [];
    lstTemp;
    fixedLstDataStr: string = '';
    reference: string;
    isDisabled: boolean;
    private readonly destroy$ = new Subject<void>();

    constructor(private apiService: ApiService) { }

    onChange(value) { }

    onTouched: () => void;
    writeValue(obj: any) {
        if (this.value != '')
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

    onSelectionChange(e: string) {
        if (this.value != '') {
            this.writeValue(e);
            this.onChange(e);
        }

    }

    onKeydownEvent(e) {
        if (e.keyCode == 13) {
            if (e.target.value != '') {
                {
                    this.writeValue(e.target.value);
                    this.onChange(e.target.value);
                    this.lstData.push(e.target.value);
                }
            }
        } else {
            let filterVal = ReportUtil.removeVietnameseTones(e.target.value.toLowerCase());
            if (filterVal != '' && filterVal.length > 0)
                this.lstData = this.lstData.filter(x => ReportUtil.removeVietnameseTones(x.toLowerCase()).includes(filterVal));
            else
                this.lstData = JSON.parse(this.lstTemp);
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
            case DropDownListEnum.LOAI_DE_THI:
                this.loadLoaiDeThi();
                break;
            case DropDownListEnum.TRANG_THAI_DE_THI:
                this.loadTrangThaiDeThi();
                break;
            case DropDownListEnum.LOAI_LOP_HOC:
                this.loadLoaiLopHoc();
                break;
            case DropDownListEnum.TRANG_THAI_LOP_HOC:
                this.loadTrangThaiLopHoc();
                break;
            case DropDownListEnum.LOAI_HOC_VIEN:
                this.loadLoaiHocVien();
                break;
            case DropDownListEnum.TRANG_THAI_HOC_VIEN:
                this.loadTrangThaiHocVien();
                break;
            case DropDownListEnum.LOAI_DAT_LICH:
                this.loadLoaiDatLich();
                break;
            case DropDownListEnum.TRANG_THAI_DAT_LICH:
                this.loadTrangThaiDatLich();
                break;
            case DropDownListEnum.LOAI_DICH_VU:
                this.loadLoaiDichVu();
                break;
            case DropDownListEnum.TRANG_THAI_DICH_VU:
                this.loadTrangThaiDichVu();
                break;
            case DropDownListEnum.LOAI_BO_SAN_PHAM:
                this.loadBoSanPham();
                break;
            case DropDownListEnum.TRANG_THAI_BO_SAN_PHAM:
                this.loadTrangThaiBoSanPham();
                break;
            case DropDownListEnum.LOAI_DON_HANG:
                this.loadDonHang();
                break;
            case DropDownListEnum.TRANG_THAI_DON_HANG:
                this.loadTrangThaiDonHang();
                break;
        }
    }

    loadLoaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=LoaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }

    loadNguonKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=nguonKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTranngThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangThaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadLoaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=loaichamsoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }

    loadNhanVienPhuTrach() {
        this.apiService
            .get(UrlConstant.ROUTE.GET_USER)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    let data = res.items.map((x: any) => {
                        return x.name ?? null;
                    })
                    this.lstData = data.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }

    loadTrangThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangthaikhachhang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTrangThaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=trangThaiChamSoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadLoaiDeThi() {
        this.apiService
            .get(this.url + `?tenBang=GetDeThis&tenCot=loaiDeThi`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTrangThaiDeThi() {
        this.apiService
            .get(this.url + `?tenBang=GetDeThis&tenCot=trangThaiDeThi`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }

    loadLoaiLopHoc() {
        this.apiService
            .get(this.url + `?tenBang=GetLopHocs&tenCot=loaiLopHoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }

    loadTrangThaiLopHoc() {
        this.apiService
            .get(this.url + `?tenBang=GetLopHocs&tenCot=trangThaiLopHoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadLoaiHocVien() {
        this.apiService
            .get(this.url + `?tenBang=GetHocViens&tenCot=loaiHocVien`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTrangThaiHocVien() {
        this.apiService
            .get(this.url + `?tenBang=GetHocViens&tenCot=trangThaiHocVien`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadLoaiDatLich() {
        this.apiService
            .get(this.url + `?tenBang=GetLichDetails&tenCot=loaiDatLich`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTrangThaiDatLich() {
        this.apiService
            .get(this.url + `?tenBang=GetLichDetails&tenCot=trangThaiDatLich`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadLoaiDichVu() {
        this.apiService
            .get(this.url + `?tenBang=GetDichVus&tenCot=loaiDichVu`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTrangThaiDichVu() {
        this.apiService
            .get(this.url + `?tenBang=GetDichVus&tenCot=trangThaiDichVu`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadBoSanPham() {
        this.apiService
            .get(this.url + `?tenBang=GetBoSanPhams&tenCot=loaiBoSanPham`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTrangThaiBoSanPham() {
        this.apiService
            .get(this.url + `?tenBang=GetBoSanPhams&tenCot=trangThaiBoSanPhams`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadDonHang() {
        this.apiService
            .get(this.url + `?tenBang=GetDonHangs&tenCot=loaiDonHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
    loadTrangThaiDonHang() {
        this.apiService
            .get(this.url + `?tenBang=GetDonHangs&tenCot=trangThaiDonHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null);
                    this.fixedLstDataStr = this.lstData.join(',');
                    this.lstTemp = JSON.stringify(this.lstData);
                }
            });
    }
}
