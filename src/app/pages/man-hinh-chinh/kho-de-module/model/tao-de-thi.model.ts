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
    dapAns: IDapAn[],
    items: ICauHoi[]
}

export interface IDapAn{
    cauHoiId: number,
    noiDungCauHoi: string,
    isDapAnDung: boolean,
    creationTime: number,
    creatorId: string,
    id: number
}
export interface IDeThi{
    id: 0,
    tenDeThi: string,
    loaiDeThi: string,
    trangThaiDeThi: string
}