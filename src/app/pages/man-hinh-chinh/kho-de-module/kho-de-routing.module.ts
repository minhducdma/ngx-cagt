import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessfulTestComponent } from '../../miscellaneous/successful-test/successful-test.component';
import { KhoDeComponent } from './kho-de.component';
import { LamBaiThiComponent } from './lam-bai-thi/lam-bai-thi.component';
import { QuanLyDeThiComponent } from './quan-ly-de-thi/quan-ly-de-thi.component';
import { TaoDeThiComponent } from './tao-de-thi/tao-de-thi.component';

const routes: Routes = [{
    path: '',
    component: KhoDeComponent,
    children: [
        {
            path: 'tao-de-thi/:deThiId',
            component: TaoDeThiComponent,
        },
        {
            path: 'lam-bai-thi',
            component: LamBaiThiComponent,
        },
        {
          path: ':deThiId/user/:userDetail',
          component: LamBaiThiComponent,
        },
        {
            path: 'de-thi',
            component: QuanLyDeThiComponent,
        },
        {
            path: 'successfull',
            component: SuccessfulTestComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KhoDeRoutingModule { }

export const routedComponents = [
    TaoDeThiComponent,
    LamBaiThiComponent,
    KhoDeComponent,
    QuanLyDeThiComponent
];
