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
    dapAnChon: number[];
}

export interface IDapAn{
    cauHoiId: number;
    noiDungCauHoi: string;
    isDapAnDung: boolean;
    id: number;
}
<<<<<<< HEAD

export interface IDeThi{
  id: number;
  tenDeThi: string;
  loaiDeThi: string;
  trangThaiDeThi: string;
}


=======
>>>>>>> a8004fddf4f765992a9e837fbc7e646f51e972f4
