import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'quan-ly-khach-hang',
      loadChildren: () => import('./khach-hang-module/khach-hang.module')
      .then(m => m.KhachHangModule),
    },
    {
      path: 'kho-de',
      loadChildren: () => import('./kho-de-module/kho-de.module')
      .then(m => m.KhoDeModule),
    },
    {
      path: 'quan-ly-hoc-vien',
      loadChildren: () => import('./hoc-vien-module/hoc-vien.module')
      .then(m => m.HocVienModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {
}
