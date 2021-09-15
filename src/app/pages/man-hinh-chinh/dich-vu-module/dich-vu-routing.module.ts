import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DichVuComponent } from './dich-vu.component';

const routes: Routes = [{
    path: '',
    component: DichVuComponent,
    children: [
        // {
        //     path: 'tao-de-thi/:deThiId',
        //     component: TaoDeThiComponent,
        // },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DichVuRoutingModule { }

export const routedComponents = [
    DichVuComponent
];
