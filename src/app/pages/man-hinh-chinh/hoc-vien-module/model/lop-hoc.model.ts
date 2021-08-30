import { IGenerice } from "./base.model";

export interface ILopHoc extends IGenerice {

    id: 0,
    creationTime: string,
    creatorId: string,
    maLopHoc: string,
    tenLopHoc: string,
    loaiLopHoc: string,
    trangThaiLopHoc: string,
    siSoToiDa: number,
    isNgayChan: boolean,
    tongSoBuoi: number,
    tongSoBaiKiemTra: number,
    thoiGianBatDau: string,
    thoiGianKetThuc: string
}