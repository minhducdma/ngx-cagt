import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachHocVienComponent } from './danh-sach-hoc-vien/danh-sach-hoc-vien.component';
import { FormHocVienLopHocComponent } from './danh-sach-hoc-vien/form-hoc-vien-lop-hoc/form-hoc-vien-lop-hoc.component';
import { FormHocVienComponent } from './danh-sach-hoc-vien/form-hoc-vien/form-hoc-vien.component';
import { DanhSachLopHocComponent } from './danh-sach-lop-hoc/danh-sach-lop-hoc.component';
import { FormLopHocComponent } from './danh-sach-lop-hoc/form-lop-hoc/form-lop-hoc.component';
import { HocViensComponent } from './hoc-vien.component';
import { ChonHocVienComponent } from './_component/chon-hoc-vien/chon-hoc-vien.component';
import { TriggerChonHocVienComponent } from './_component/chon-hoc-vien/trigger-chon-hoc-vien/trigger-chon-hoc-vien.component';
import { FormImportNhanVienComponent } from './user/form-import-nhan-vien/form-import-nhan-vien.component';
import { UserComponent } from './user/user.component';
import { FormLichDetailComponent } from './_component/lich-xep-lop/form-lich-detail/form-lich-detail.component';
import { LichXepLopComponent } from './_component/lich-xep-lop/lich-xep-lop.component';

const routes: Routes = [{
    path: '',
    component: HocViensComponent,
    children: [
        {
            path: 'edit-lop-hoc/:lopId',
            component: FormLopHocComponent,
        },
        {
            path: 'danh-sach-hoc-vien',
            component: DanhSachHocVienComponent,
        },
        {
            path: 'danh-sach-lop-hoc',
            component: DanhSachLopHocComponent,
        },
        {
            path: 'danh-sach-user',
            component: UserComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class HocVienRoutingModule { }

export const routedComponents = [
    HocViensComponent,
    FormLopHocComponent,
    LichXepLopComponent,
    DanhSachHocVienComponent,
    DanhSachLopHocComponent,
    FormHocVienComponent,
    FormLichDetailComponent,
    TriggerChonHocVienComponent,
    ChonHocVienComponent,
    FormHocVienLopHocComponent,
    UserComponent,
    FormImportNhanVienComponent
];
