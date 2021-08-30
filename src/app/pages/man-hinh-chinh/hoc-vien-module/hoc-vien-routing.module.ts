import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormLopHocComponent } from './form-lop-hoc/form-lop-hoc.component';
import { HocViensComponent } from './hoc-vien.component';
import { LichXepLopComponent } from './_component/lich-xep-lop/lich-xep-lop.component';

const routes: Routes = [{
    path: '',
    component: HocViensComponent,
    children: [
        {
            path: 'edit-lop-hoc/:lopId',
            component: FormLopHocComponent,
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
    LichXepLopComponent
];
