import { Component, Injector, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseListComponent } from '../../base/base-list.component';
import { IHocVien } from '../../model/hoc-vien-model';

@Component({
  selector: 'app-chon-hoc-vien',
  templateUrl: './chon-hoc-vien.component.html',
  styleUrls: ['./chon-hoc-vien.component.scss']
})
export class ChonHocVienComponent extends BaseListComponent<IHocVien> implements OnInit {
    url: string = UrlConstant.ROUTE.HOC_VIEN_KENDO;
    selectedItem: IHocVien;

    modelSearch = {
         filter: null,
         idKhachHang: null,
         idsLop: [],
         trangThaiHocViens: 0,
         loaiHocViens: null
    };


    constructor(
         injector: Injector,
         protected windowRef: WindowRef
    ) {
         super(injector)
    }
    private get extendQueryOptions() {
         return {
              filter: this.modelSearch.filter ? this.modelSearch.filter : null,
              idKhachHang: 0,
              //idsLop:  this.modelSearch.idsLop,
              trangThaiHocViens: this.modelSearch.trangThaiHocViens ? this.convertArrToStr(this.modelSearch.trangThaiHocViens) : null,
              loaiHocViens: this.modelSearch.loaiHocViens ? this.convertArrToStr(this.modelSearch.loaiHocViens) : null,
              ...this.queryOptions,
         };
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
    }

    resetHandler() {
         this.modelSearch = {
              filter: null,
              idKhachHang: 0,
              idsLop: [],
              trangThaiHocViens: null,
              loaiHocViens: null
         };

         this.loadItems();
    }
    selectRow(e: SelectionEvent) {
        if(e.selectedRows.length > 0){
            this.selectedItem = e.selectedRows[0].dataItem;
        }else{
            this.selectedItem = null;
        }
    }
    closeForm() {
        this.windowRef.close();
    }
    chonHocVien(){
        if(this.selectedItem != null){
            this.windowRef.close(this.selectedItem);
        }else{
            this.notification.show('Vui lòng chọn đề thi','Cảnh báo', { status :'warning' });
        }
    }
}
