import { IGenerice } from "./base.model";

export interface IChamSocKhachHang extends IGenerice {
    id: number;
    codeChamSoc: string;
    noiDungChamSoc: string;
    ngayChamSocDuKien: string;
    feedBackKhahHang: string;
    loaiChamSoc: string;
    trangThaiChamSoc: string;
    khachHangId: number;
    baiThiThuId: number;
    requestXepLopId: number;
    kichBanHienTai: number;
    isChuyenKichBan: boolean;
}