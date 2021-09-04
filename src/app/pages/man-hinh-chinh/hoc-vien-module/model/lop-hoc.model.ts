import { IGenerice } from "./base.model";

export interface ILopHoc extends IGenerice {

    id: number,
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