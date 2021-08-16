import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhoDeComponent } from './kho-de.component';
import { LamBaiThiComponent } from './lam-bai-thi/lam-bai-thi.component';
import { TaoDeThiComponent } from './tao-de-thi/tao-de-thi.component';

const routes: Routes = [{
    path: '',
    component: KhoDeComponent,
    children: [
        {
            path: 'tao-de-thi',
            component: TaoDeThiComponent,
        },
        {
            path: 'lam-bai-thi',
            component: LamBaiThiComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KhachHangRoutingModule { }

export const routedComponents = [
    TaoDeThiComponent,
    LamBaiThiComponent,
    KhoDeComponent
];
