import { IGenerice } from "./base.model";

export interface IKhachHang extends IGenerice {
    id: number;
    hoTen: string;
    diaChi: string;
    email: string;
    soDienThoai: string;
    ngaySinh: string;
    nguonKhachHang: string;
    loaiKhachHang: string;
    nhanVienPhuTrach: string;
    trangThaiKhachHang: string;
    trinhDo: string;
    taiKhoanMangXaHoi: string;
    hoTenBo: string;
    soDienThoaiBo: string;
    emailBo: string;
    hoTenMe: string;
    soDienThoaiMe: string;
    emailMe: string;
    ghiChu: string;
    quanTamDuHoc: string;
}