import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DichVuComponent } from './dich-vu.component';
import { FormQlDichVuComponent } from './ql-dich-vu/form-ql-dich-vu/form-ql-dich-vu.component';
import { QlDichVuComponent } from './ql-dich-vu/ql-dich-vu.component';

const routes: Routes = [{
    path: '',
    component: DichVuComponent,
    children: [
        {
            path: 'ql-dich-vu',
            component: QlDichVuComponent,
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
    FormQlDichVuComponent
];
