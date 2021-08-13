import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhachHangComponent } from './khach-hang/khach-hang.component';

import { AdminComponent } from './admin.component';
import { FormKhachHangComponent } from './khach-hang/form-khach-hang/form-khach-hang.component';
import { TaoDeThiComponent } from './tao-de-thi/tao-de-thi.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'khach-hang',
      component: KhachHangComponent,
    },
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
export class AdminsRoutingModule { }

export const routedComponents = [
  KhachHangComponent,
  AdminComponent,
  FormKhachHangComponent,
  TaoDeThiComponent
];
