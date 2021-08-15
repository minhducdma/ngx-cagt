import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaoDeThiComponent } from './tao-de-thi/tao-de-thi.component';

const routes: Routes = [{
    path: '',
    component: TaoDeThiComponent,
    children: [
        {
            path: 'tao-de-thi',
            component: TaoDeThiComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KhachHangRoutingModule { }

export const routedComponents = [
    TaoDeThiComponent
];
