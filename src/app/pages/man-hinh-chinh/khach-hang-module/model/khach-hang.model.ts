import { IGenerice } from "./base.model";

export interface IKhachHang extends IGenerice {
    id: 5;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: string;
    diaChi: string;
    soDienThoai: string;
    email: string;
    loaiKhachHang: string;
}