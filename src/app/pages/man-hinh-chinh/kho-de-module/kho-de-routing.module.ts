import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeThiComponent } from './de-thi/de-thi.component';
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
        {
            path: 'de-thi',
            component: DeThiComponent,
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
    DeThiComponent,
];
