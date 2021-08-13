export interface ICauHoi {
    id: number,
    parentId: number,
    codeCauHoi: number,
    tenCauHoi: string,
    noiDungCauHoi: string,
    chiaSeUsers: string,
    loaiCauHoi: string,
    trangThaiCauHoi: string,
    tongSoDiem: number,
    tongThoiGian: number,
    metadata: string,
    dapAns: IDapAn[]
}

export interface IDapAn{
    cauHoiId: number,
    noiDungCauHoi: string,
    isDapAnDung: boolean,
    creationTime: number,
    creatorId: string,
    id: number
}