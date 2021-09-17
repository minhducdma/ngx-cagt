import { IBoSanPham } from "./bo-san-pham.model";

export interface ISanPham {
    id: number;
    dichVuId: number;
    boSanPhamId: number;
    codeSanPham: string;
    tenSanPham: string;
    loaiSanPham: string;
    trangThaiSanPham: string;
    giaBan: number;
    phanTramThue: number;
    giaGoc: number;
    giaKhuyenMai: number;
    noiDungMarketing: string;
    baiThiThuId: number;
    dichVuDTO: IBoSanPham;
}