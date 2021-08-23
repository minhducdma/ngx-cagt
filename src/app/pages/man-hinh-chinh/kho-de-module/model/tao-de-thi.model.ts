export interface ICauHoi {
    id: number;
    parentId: number;
    codeCauHoi: string;
    tenCauHoi: string;
    noiDungCauHoi: string;
    chiaSeUsers: string;
    loaiCauHoi: string;
    trangThaiCauHoi: string;
    tongSoDiem: number;
    tongThoiGian: number;
    metadata: string;
    dapAns: IDapAn[];
    items: ICauHoi[];
    root: number;
    level: number;
    orderDetail: string;
    randomGUID: number;
    cauTraLoi: string;

    dapAnChonSingle: number;
}

export interface IDapAn{
    cauHoiId: number;
    noiDungCauHoi: string;
    isDapAnDung: boolean;
    id: number;
    dapAnChon: boolean;
}

export interface IDeThi{
  id: number;
  tenDeThi: string;
  loaiDeThi: string;
  trangThaiDeThi: string;
  tongThoiGian: number,
  tongSoDiem: number,
}

export interface IBoDemGio{
  id: number;
  ten: string;
  thoiGian: number;
  isStart: boolean;
}



export interface ILamBaiThi {
  userId: string;
  userDetail: string;
  deThiId: number;
  cauHoiId: number;
  isDapAnDung: boolean;
  cauTraLoi : string;
  listDapAns: number[];

}
