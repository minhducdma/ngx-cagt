import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    @Input() isMulti: Boolean = false;

    options;

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
        if (e != undefined) {
            this.writeValue(e);
            this.onChange(e);
        }
    }
    ngOnInit() {
        this.options = {
            multiple: this.isMulti,
            tags: this.isMulti,
            width: '100%'
        };
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
            case DropDownListEnum.LOAI_NHAN_VIEN:
                this.loadLoaiNhanVien();
                break;
            case DropDownListEnum.TRANG_THAI_NHAN_VIEN:
                this.loadTrangThaiNhanVien();
                break;
            case DropDownListEnum.LOAD_ROLE:
                this.loadRole();
                break;
            case DropDownListEnum.LOAD_DAN_TOC:
                this.loadDanToc();
                break;
            case DropDownListEnum.LOAD_TON_GIAO:
                this.loadTonGiao();
                break;
            case DropDownListEnum.LOAI_DICH_VU:
                this.loadLoaiDichVu();
                break;
            case DropDownListEnum.TRANG_THAI_DICH_VU:
                this.loadTrangThaiDichVu();
                break;
        }
    }

    loadLoaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=LoaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }

    loadNguonKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=nguonKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadTranngThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangThaiKhachHang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadLoaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=loaichamsoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }

    loadNhanVienPhuTrach() {
        this.apiService
            .get(UrlConstant.IDENTITY_BASE_URL)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    let data = res.items.map((x: any) => {
                        return {
                            id: x.name,
                            text: x.name
                        };
                    })
                    this.lstData = data.filter(x => x != null);
                }
            });
    }

    loadTrangThaiKhachHang() {
        this.apiService
            .get(this.url + `?tenBang=GetKhachHangs&tenCot=trangthaikhachhang`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadTrangThaiChamSoc() {
        this.apiService
            .get(this.url + `?tenBang=GetChamSocKhachHangs&tenCot=trangThaiChamSoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadLoaiDeThi() {
        this.apiService
            .get(this.url + `?tenBang=GetDeThis&tenCot=loaiDeThi`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadTrangThaiDeThi() {
        this.apiService
            .get(this.url + `?tenBang=GetDeThis&tenCot=trangThaiDeThi`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }

    loadLoaiLopHoc() {
        this.apiService
            .get(this.url + `?tenBang=GetLopHocs&tenCot=loaiLopHoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }

    loadTrangThaiLopHoc() {
        this.apiService
            .get(this.url + `?tenBang=GetLopHocs&tenCot=trangThaiLopHoc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadLoaiHocVien() {
        this.apiService
            .get(this.url + `?tenBang=GetHocViens&tenCot=loaiHocVien`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadTrangThaiHocVien() {
        this.apiService
            .get(this.url + `?tenBang=GetHocViens&tenCot=trangThaiHocVien`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });

    }
    loadLoaiNhanVien() {
        this.apiService
            .get(this.url + `?tenBang=GetNhanViens&tenCot=loaiNhanVien`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });

    }
    loadTrangThaiNhanVien() {
        this.apiService
            .get(this.url + `?tenBang=GetNhanViens&tenCot=trangThaiNhanVien`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });

    }
    loadRole() {
        this.apiService
            .get(this.url + `?tenBang=AbpRoles&tenCot=Name`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });

    }
    loadDanToc() {
        this.apiService
            .get(this.url + `?tenBang=GetNhanViens&tenCot=danToc`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });

    }
    loadTonGiao() {
        this.apiService
            .get(this.url + `?tenBang=GetNhanViens&tenCot=tonGiao`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });

    }
    loadLoaiDichVu() {
        this.apiService
            .get(this.url + `?tenBang=GetDichVus&tenCot=loaiDichVu`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
    loadTrangThaiDichVu() {
        this.apiService
            .get(this.url + `?tenBang=GetDichVus&tenCot=trangThaiDichVu`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res) {
                    this.lstData = res.filter(x => x != null).map((e: any) => {
                        return {
                            id: e,
                            text: e
                        }
                    });
                }
            });
    }
}
