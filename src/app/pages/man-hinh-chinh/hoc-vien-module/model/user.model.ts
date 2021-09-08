import { IGenerice } from "./base.model";

export interface IUser{
    userId: string,
    soDienThoai: string,
    gioiTinh: number,
    maSoCanCuoc: string,
    quocTich: string,
    danToc: string,
    tonGiao: string,
    maSoThue: string,
    soTaiKhoan: string,
    tenTaiKhoan: string,
    tenNganHang: string,
    chiNhanhNganHang: string,
    loaiNhanVien: string,
    trangThaiNhanVien: string,
    ngaySinh: string,
    userDetail: {
        id: string,
        name: string,
        surname: string,
        email: string,
        normalizedEmail: string,
        roles: Array<{}>,
        userName: string,
        normalizedUserName: string
    },
    creationTime: string,
    creatorId: string,
    id: number
}