import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamSocKhachHangComponent } from './cham-soc-khach-hang/cham-soc-khach-hang.component';
import { FormChamSocKhachHangComponent } from './cham-soc-khach-hang/form-cham-soc-khach-hang/form-cham-soc-khach-hang.component';
import { KhachHangsComponent } from './khach-hang.component';
import { FormImportKhachHangComponent } from './khach-hang/form-import-khach-hang/form-import-khach-hang.component';
import { FormKhachHangComponent } from './khach-hang/form-khach-hang/form-khach-hang.component';
import { KhachHangComponent } from './khach-hang/khach-hang.component';
import { TrangThaiChamSoc1Component } from './khach-hang/trang-thai-cham-soc/trang-thai-cham-soc-1/trang-thai-cham-soc-1.component';
import { TrangThaiChamSoc2Component } from './khach-hang/trang-thai-cham-soc/trang-thai-cham-soc-2/trang-thai-cham-soc-2.component';
import { TrangThaiChamSoc3Component } from './khach-hang/trang-thai-cham-soc/trang-thai-cham-soc-3/trang-thai-cham-soc-3.component';

const routes: Routes = [{
  path: '',
  component: KhachHangsComponent,
  children: [
    {
      path: 'khach-hang',
      component: KhachHangComponent,
    },
    {
      path: 'cham-soc-khach-hang',
      component: ChamSocKhachHangComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class KhachHangRoutingModule { }

export const routedComponents = [
  KhachHangsComponent,
  KhachHangComponent,
  FormKhachHangComponent,
  FormImportKhachHangComponent,
  ChamSocKhachHangComponent,
  FormChamSocKhachHangComponent,
  TrangThaiChamSoc1Component,
  TrangThaiChamSoc2Component, 
  TrangThaiChamSoc3Component,
];