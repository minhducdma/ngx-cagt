import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhachHangComponent } from './khach-hang/khach-hang.component';

import { AdminComponent } from './admin.component';
import { FormKhachHangComponent } from './khach-hang/form-khach-hang/form-khach-hang.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'khach-hang',
      component: KhachHangComponent,
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
  FormKhachHangComponent
];
