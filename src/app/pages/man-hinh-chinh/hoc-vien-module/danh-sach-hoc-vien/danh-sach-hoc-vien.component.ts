import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { FormKhachHangComponent } from '../../khach-hang-module/khach-hang/form-khach-hang/form-khach-hang.component';
import { BaseListComponent } from '../base/base-list.component';
import { IHocVien } from '../model/hoc-vien-model';
import { FormHocVienComponent } from './form-hoc-vien/form-hoc-vien.component';

@Component({
     selector: 'app-danh-sach-hoc-vien',
     templateUrl: './danh-sach-hoc-vien.component.html',
     styleUrls: ['./danh-sach-hoc-vien.component.scss']
})
export class DanhSachHocVienComponent extends BaseListComponent<IHocVien> implements OnInit {
     url: string = UrlConstant.ROUTE.HOC_VIEN_KENDO;

     modelSearch = {
          filter: null,
          idKhachHang: null,
          trangThaiHocViens: 0,
          loaiHocViens: null
     };


     constructor(
          injector: Injector,
     ) {
          super(injector)
     }
     private get extendQueryOptions() {
          return {
               filter: this.modelSearch.filter ? this.modelSearch.filter : null,
               idKhachHang: 0,
               trangThaiHocViens: this.modelSearch.trangThaiHocViens ? this.convertArrToStr(this.modelSearch.trangThaiHocViens) : null,
               loaiHocViens: this.modelSearch.loaiHocViens ? this.convertArrToStr(this.modelSearch.loaiHocViens) : null,
               ...this.queryOptions,
          };
     }

     ngOnChange() {
          this.loadItems();
     }

     ngOnInit(): void {
          super.ngOnInit();
     }

     onStateChange(state: State) {
          this.gridState = state;
          this.loadItems();
     }
     loadItems() {
          this.apiService.post(this.url, this.extendQueryOptions)
               .pipe(takeUntil(this.destroy$))
               .subscribe((res: any) => {
                    if (res && res.items) {
                         this.gridView$.data = res.items;
                         this.gridView$.total = res.pagingInfo.totalItems;
                    }
               });
     }

     showFormCreateOrUpdate() {
          this.opened = true;
          const windowRef = this.windowService.open({
               title: "Cập nhật học viên",
               content: FormHocVienComponent,
               width: 900,
               top: 100,
               autoFocusedElement: 'body',
          });
          const param = windowRef.content.instance;
          param.action = this.action;
          param.model = this.model;
          param.isHocVien = true;

          windowRef.result.subscribe(result => {
               if (result instanceof WindowCloseResult) {
                    this.opened = false;
                    this.loadItems();
               }
          });
     }

     editHandler(dataItem) {
          // tslint:disable-next-line: no-unsafe-any
          this.model = dataItem;
          this.action = ActionEnum.UPDATE;
          this.showFormCreateOrUpdate();
     }

     addHandler() {
          this.model = undefined;
          this.action = ActionEnum.CREATE;
          this.showFormCreateOrUpdate();
     }

     resetHandler() {
          this.modelSearch = {
               filter: null,
               idKhachHang: 0,
               trangThaiHocViens: null,
               loaiHocViens: null
          };

          this.loadItems();
     }
     removeHandler(dataItem) {
          this.selectionIds = [];
          this.selectionIds.push(dataItem.id);
          this.removeSelectedHandler();
     }

     removeSelectedHandler() {
          if (this.selectionIds.length > 0) {
               const body = {
                    ids: [...new Set(this.selectionIds)],
               };
               this.apiService.post('/hoc-vien/delete-many-hoc-viens', body.ids).subscribe(res => {
                    this.selectionIds = [];
                    this.showMessage('success', 'Thành công', 'Xóa thành công');
                    this.loadItems();
               });
          }
     }

}