import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamSocKhachHangComponent } from './khach-hang/cham-soc-khach-hang/cham-soc-khach-hang.component';
import { FormChamSocKhachHangComponent } from './khach-hang/cham-soc-khach-hang/form-cham-soc-khach-hang/form-cham-soc-khach-hang.component';
import { FormImportKhachHangComponent } from './khach-hang/form-import-khach-hang/form-import-khach-hang.component';
import { FormKhachHangComponent } from './khach-hang/form-khach-hang/form-khach-hang.component';
import { KhachHangComponent } from './khach-hang/khach-hang.component';

const routes: Routes = [{
  path: '',
  component: KhachHangComponent,
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
export class KhachHangRoutingModule { }

export const routedComponents = [
  KhachHangComponent,
  KhachHangComponent,
  FormKhachHangComponent,
  FormImportKhachHangComponent,
  ChamSocKhachHangComponent,
  FormChamSocKhachHangComponent

];
