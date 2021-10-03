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
  dapAnChons: IDapAnChon[];
  dapAnChonSingle: number;
  lamBaiThiId: number;
}

export interface IDapAn {
  cauHoiId: number;
  noiDungCauHoi: string;
  isDapAnDung: boolean;
  isDapAnChon: boolean;
  id: number;
  dapAnChon: boolean;
}

export interface IDeThi {
  id: number;
  tenDeThi: string;
  loaiDeThi: string;
  trangThaiDeThi: string;
  tongThoiGian: number;
  tongSoDiem: number;
}

export interface IBoDemGio {
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
  cauTraLoi: string;
  listDapAns: number[];

}

export interface IDeThi {
  id: number;
  creationTime: string;
  creatorId: string;
  tenDeThi: string;
  loaiDeThi: string;
  trangThaiDeThi: string;
}

export interface IDapAnChon {
  lamBaiThiId: number;
  cauHoiId: number;
  isDapAnDung: boolean;
  listDapAns: string;
  cauTraLoi: string;
  creationTime: string;
  creatorId: string;
  id: number;
}

export interface IChamThi{
  id: number;
  chamThiId: number;
  lamBaiThiId: number;
  nhanVienId: string;
  tenChamThi: string;
  noiDungChamThi: string;
  diemThucTe: number;
  tongDiem: number;
  loaiChamThi: string;
  trangThaiChamThi: string;
  chamThiDetails: IChamThiDetail[];
}

export interface IChamThiDetail{
  id: number;
  chamThiId: number;
  lamBaiThiId: number;
  cauHoiId: number;
  nhanXet: string;
}