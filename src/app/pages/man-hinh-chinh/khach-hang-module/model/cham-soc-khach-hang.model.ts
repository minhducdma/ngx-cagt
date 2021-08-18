import { IGenerice } from "./base.model";

export interface IChamSocKhachHang extends IGenerice {
    id: number;
    codeChamSoc: string;
    noiDungChamSoc: string;
    ngayChamSocDuKien: string;
    feedBackKhahHang: string;
    loaiChamSoc: string;
    trangThaiChamSoc: string;
}