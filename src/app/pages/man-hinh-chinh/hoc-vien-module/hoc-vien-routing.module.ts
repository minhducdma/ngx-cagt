import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HocVienLopHocComponent } from './hoc-vien-lop-hoc/hoc-vien-lop-hoc.component';

import { HocViensComponent } from './hoc-vien.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';

const routes: Routes = [{
    path: '',
    component: HocViensComponent,
    children: [
        {
          path: 'hoc-vien-lop-hoc',
          component: HocVienLopHocComponent,
        },
        {
            path: 'lop-hoc',
            component: LopHocComponent,
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
    HocVienLopHocComponent,
    LopHocComponent
];
