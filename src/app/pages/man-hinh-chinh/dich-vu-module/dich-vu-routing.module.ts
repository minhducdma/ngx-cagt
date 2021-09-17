import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DichVuComponent } from './dich-vu.component';
import { FormQlBoSanPhamComponent } from './ql-bo-san-pham/form-ql-bo-san-pham/form-ql-bo-san-pham.component';
import { QlBoSanPhamComponent } from './ql-bo-san-pham/ql-bo-san-pham.component';
import { FormQlDichVuComponent } from './ql-dich-vu/form-ql-dich-vu/form-ql-dich-vu.component';
import { QlDichVuComponent } from './ql-dich-vu/ql-dich-vu.component';
import { FormSanPhamComponent } from './san-pham/form-san-pham/form-san-pham.component';
import { SanPhamComponent } from './san-pham/san-pham.component';
import { ChonBoSanPhamComponent } from './_components/chon-bo-san-pham/chon-bo-san-pham.component'

const routes: Routes = [{
    path: '',
    component: DichVuComponent,
    children: [
        {
            path: 'ql-dich-vu',
            component: QlDichVuComponent,
        },
        {
            path: 'ql-bo-san-pham',
            component: QlBoSanPhamComponent,
        },
        {
            path: 'san-pham/:dichVuId',
            component: SanPhamComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DichVuRoutingModule { }

export const routedComponents = [
    DichVuComponent,
    QlDichVuComponent,
    FormQlDichVuComponent,
    QlBoSanPhamComponent,
    FormQlBoSanPhamComponent,
    SanPhamComponent,
    FormSanPhamComponent,
    ChonBoSanPhamComponent
];
