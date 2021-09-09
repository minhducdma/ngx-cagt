import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamThiComponent } from './cham-thi.component';

const routes: Routes = [{
    path: '',
    component: ChamThiComponent,
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
export class ChamThiRoutingModule { }

export const routedComponents = [
    ChamThiComponent
];
