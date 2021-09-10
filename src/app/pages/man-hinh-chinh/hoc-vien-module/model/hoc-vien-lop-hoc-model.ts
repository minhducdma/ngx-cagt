import { IKhachHang } from "../../khach-hang-module/model/khach-hang.model";

export interface IHocVienLopHoc {
    id: number;
    hocVienId: number;
    lopHocId: number;
    thoiGianJoinLop: string;
    isBaoLuu: true;
    khachHang: IKhachHang;
}