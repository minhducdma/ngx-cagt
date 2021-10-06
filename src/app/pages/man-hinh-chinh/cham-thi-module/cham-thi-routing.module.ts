import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamThisComponent } from './cham-thi.component';
import { ChamThiComponent } from './cham-thi/cham-thi.component';
import { FormChamThiPhanThiComponent } from './cham-thi/form-cham-thi-phan-thi/form-cham-thi-phan-thi.component';
import { FormChamThiComponent } from './cham-thi/form-cham-thi/form-cham-thi.component';

const routes: Routes = [{
    path: '',
    component: ChamThisComponent,
    children: [
        {
            path: 'cham-thi/:chamThiId',
            component: ChamThiComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChamThiRoutingModule { }

export const routedComponents = [
    ChamThisComponent,
    ChamThiComponent,
    FormChamThiComponent,
    FormChamThiPhanThiComponent
];
