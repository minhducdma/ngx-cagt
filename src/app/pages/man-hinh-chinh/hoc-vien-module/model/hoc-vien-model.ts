import { IKhachHang } from "../../khach-hang-module/model/khach-hang.model";

export interface IHocVien {
    id: number;
    creationTime: string;
    creatorId: string;
    khachHangId: number;
    maHocVien: string;
    countKhoaHoc: number;
    loaiHocVien: string;
    trangThaiHocVien: string;
    khachHang: IKhachHang;
}