import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HocViensComponent } from './hoc-vien.component';

const routes: Routes = [{
    path: '',
    component: HocViensComponent,
    children: [
        // {
        //   path: 'khach-hang',
        //   component: KhachHangComponent,
        // },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class HocVienRoutingModule { }

export const routedComponents = [
    HocViensComponent
];
