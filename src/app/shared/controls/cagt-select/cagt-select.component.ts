import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../@core/constants/url.constant';
import { ApiService } from '../../../@core/services/api.service';
import { IBoSanPham } from '../../../pages/man-hinh-chinh/dich-vu-module/model/bo-san-pham.model';
import { IDichVu } from '../../../pages/man-hinh-chinh/dich-vu-module/model/dich-vu.model';
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
            case DropDownListEnum.DICH_VU_ID:
                this.loadDichVuById();
                break;
            case DropDownListEnum.BO_SAN_PHAM_ID:
                this.loadBoSanPhamById();
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
    loadBoSanPham() {
        this.apiService
            .get(this.url + `?tenBang=GetBoSanPhams&tenCot=loaiBoSanPham`)
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
    loadTrangThaiBoSanPham() {
        this.apiService
            .get(this.url + `?tenBang=GetBoSanPhams&tenCot=trangThaiBoSanPhams`)
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
    loadSanPham() {
        this.apiService
            .get(this.url + `?tenBang=GetSanPhams&tenCot=loaiSanPham`)
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
    loadTrangThaiSanPham() {
        this.apiService
            .get(this.url + `?tenBang=GetSanPhams&tenCot=trangThaiSanPhams`)
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
    loadDonHang() {
        this.apiService
            .get(this.url + `?tenBang=GetDonHangs&tenCot=loaiDonHang`)
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
    loadTrangThaiDonHang() {
        this.apiService
            .get(this.url + `?tenBang=GetDonHangs&tenCot=trangThaiDonHang`)
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
    loadDichVuById(){
        this.apiService
        .get('https://apisipm.migroup.asia/api/app/dich-vu')
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {
            if (res) {
                this.lstData = res.items.filter(x => x != null).map((e: IDichVu) => {
                    return {
                        id: e.id,
                        text: e.ten
                    }
                });
            }
        });
    }
    loadBoSanPhamById(){
        this.apiService
        .get('https://apisipm.migroup.asia/api/app/bo-san-pham')
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {
            if (res) {
                this.lstData = res.items.filter(x => x != null).map((e: IBoSanPham) => {
                    return {
                        id: e.id,
                        text: e.ten
                    }
                });
            }
        });
    }
}
