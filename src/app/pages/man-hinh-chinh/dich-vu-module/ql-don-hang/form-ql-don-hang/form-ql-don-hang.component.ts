import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { FormUtil } from '../../../../../shared/utils/form';
import { EKichBanCSKH } from '../../../khach-hang-module/base/base.enum';
import { IKhachHang } from '../../../khach-hang-module/model/khach-hang.model';
import { BaseListComponent } from '../../base/base-list.component';
import { IDonHang } from '../../model/don-hang.model';
import { ISanPham } from '../../model/san-pham.model';
import { IChiTietDonHang } from '../../model/chi-tiet-don-hang.model';
import { ChonKhachHangComponent } from '../../_components/chon-khach-hang/chon-khach-hang.component';
import { ChonSanPhamComponent } from '../../_components/chon-san-pham/chon-san-pham.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-form-ql-don-hang',
    templateUrl: './form-ql-don-hang.component.html',
    styleUrls: ['./form-ql-don-hang.component.scss']
})
export class FormQlDonHangComponent extends BaseListComponent<IDonHang> implements OnInit {

    url: string = UrlConstant.ROUTE.DON_HANG;
    formKhachHang: FormGroup;
    formDonHang: FormGroup;
    arrChiTietDonHang: IChiTietDonHang[] = [];
    tongGiaBan: number = 0;
    tongGiaNhap: number = 0;
    donHangid: number = 0;

    constructor(
        injector: Injector,
        private route: ActivatedRoute,
    ) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onSubmit() {
        if (this.formKhachHang.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.formKhachHang);
            return;
        }

        if (this.arrChiTietDonHang.length <= 0)
            this.notification.show('Chọn sản phẩm dịch vụ', 'Cảnh báo', { status: 'warning' });


        this.formDonHang.get('tongGiaNhap').setValue(this.tongGiaNhap);
        this.formDonHang.get('tongGiaBan').setValue(this.tongGiaBan);
        this.formDonHang.get('khachHangId').setValue(this.formKhachHang.get("id").value);

        if (this.formDonHang.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.formDonHang);
            return;
        }
        
        this.apiService.post(this.url + '/or-update-don-hang-full-detail', {
            donHang: this.formDonHang.value,
            khachHang: this.formKhachHang.value,
            chiTietDonHangs: this.arrChiTietDonHang
        })
            .subscribe(res => {
                // show notification
                this.notification.show('Tạo mới thành công', 'Thành công', { status: 'success' });
                // close form
            });
    }
    createFormDonHang() {
        this.formDonHang = this.formBuilder.group({
            id: [0, Validators.required],
            khachHangId: [null, Validators.required],
            tongGiaNhap: [null, Validators.required],
            tongGiaBan: [null, Validators.required],
            codeDonHang: [null, Validators.required],
            tenDonHang: [null, Validators.required],
            ghiChu: [null],
            ngayTaoDonHang: [null, Validators.required],
            ngayThanhToan: [null, Validators.required],
            loaiDonHang: [null],
            trangThaiDonHang: [null]
        });
    }

    createFormKhachHang() {
        this.formKhachHang = this.formBuilder.group({
            id: [0, Validators.required],
            hoTen: [null, Validators.required],
            diaChi: [null, Validators.required],
            email: [null, Validators.required],
            soDienThoai: [null, Validators.required],
            ngaySinh: [null, Validators.required],
            nguonKhachHang: [null],
            loaiKhachHang: [null],
            nhanVienPhuTrach: [null],
            trangThaiKhachHang: [null],
            trinhDo: [null],
            taiKhoanMangXaHoi: [null],
            hoTenBo: [null, Validators.required],
            soDienThoaiBo: [null],
            emailBo: [null],
            hoTenMe: [null, Validators.required],
            soDienThoaiMe: [null],
            emailMe: [null],
            ghiChu: [null],
            quanTamDuHoc: [null],
            kichBanHienTai: EKichBanCSKH.KichBan1,
            isHocVien: [null]
        });
    }

    addFormChiTietDonHangArr() {
        return this.formBuilder.group({
            id: [0, Validators.required],
            donHangId: [0, Validators.required],
            sanPhamId: [0, Validators.required],
            soLuong: [0, Validators.required],
            giaBan: [0, Validators.required],
            giaGoc: [0, Validators.required],
            giaKhuyenMai: [0, Validators.required],
            phanTramThue: [0, Validators.required],
        })
    }

    removeDataKhachHang() {
        this.createFormKhachHang();
    }

    backToList() {
        this.router.navigate(["/pages/admin/dich-vu/ql-don-hang"]);
    }

    showFormCreateOrUpdate() {
    }

    loadItems() {
        this.createFormDonHang();
        this.createFormKhachHang();
        this.donHangid = this.route.snapshot.params.donHangid;
        if (this.donHangid > 0) {
            this.apiService.post(this.url + '/' + this.donHangid + '/collect-don-hang-by-id', {}).subscribe((res: any) => {
                if (res) {
                    this.formDonHang.patchValue(res);
                    this.formDonHang.get('ngayTaoDonHang').setValue(this.formatDate(res.ngayTaoDonHang));
                    this.formDonHang.get('ngayThanhToan').setValue(this.formatDate(res.ngayThanhToan));
                    this.formKhachHang.patchValue(res.khachHang);
                    this.formKhachHang.get('ngaySinh').setValue(this.formatDate(res.khachHang.ngaySinh));
                    this.arrChiTietDonHang = res.chiTietDonHangs;
                }
            })
        }
    }

    selectKhachHang() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Chọn khách hàng",
            content: ChonKhachHangComponent,
            width: 1100,
            top: 100,
            autoFocusedElement: 'body',
        });
        windowRef.result.subscribe((result: IKhachHang) => {
            if (result)
                this.formKhachHang.patchValue(result);
            this.opened = false;
        });
    }

    addSanPham() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Chọn sản phẩm",
            content: ChonSanPhamComponent,
            width: 1100,
            top: 100,
            autoFocusedElement: 'body',
        });
        windowRef.result.subscribe((result: ISanPham) => {
            if (result && result.id != null) {
                if (this.arrChiTietDonHang.filter(x => x.sanPhamId == result.id).length == 0) {
                    var chiTietDonHang = {
                        id: 0,
                        donHangId: 0,
                        sanPhamId: result.id,
                        tenSanPham: result.tenSanPham,
                        soLuong: 1,
                        giaBan: result.giaBan,
                        giaGoc: result.giaGoc,
                        giaKhuyenMai: result.giaKhuyenMai,
                        phanTramThue: result.phanTramThue,
                    } as IChiTietDonHang;
                    this.arrChiTietDonHang.push(chiTietDonHang);
                    this.calculatePrice();
                }
            }
            this.opened = false;
        });
    }

    calculatePrice() {
        this.tongGiaNhap = 0;
        this.tongGiaBan = 0;
        this.arrChiTietDonHang.map((x: IChiTietDonHang) => {
            if (x.giaBan != null && x.soLuong != null && x.phanTramThue != null) {
                this.tongGiaBan += ((x.giaBan - x.giaKhuyenMai) + (x.giaBan - x.giaKhuyenMai) * (x.phanTramThue / 100)) * x.soLuong;
                this.tongGiaNhap += x.giaGoc * x.soLuong;
            } else {
                this.notification.show('Nhập đầy đủ các trường dữ liệu bắt buộc', 'Cảnh báo', { status: 'warning' });
            }
        })
    }

    removeSelectedSanPham(item : IChiTietDonHang){
        const index = this.arrChiTietDonHang.indexOf(item);
        if (index > -1) {
            this.arrChiTietDonHang.splice(index, 1);
        }
    }
}


