import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult, WindowRef } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { IKhachHang } from '../../../khach-hang-module/model/khach-hang.model';
import { BaseListComponent } from '../../base/base-list.component';

@Component({
  selector: 'app-chon-khach-hang',
  templateUrl: './chon-khach-hang.component.html',
  styleUrls: ['./chon-khach-hang.component.scss']
})
export class ChonKhachHangComponent extends BaseListComponent<IKhachHang> implements OnInit {
    url: string = UrlConstant.ROUTE.KHACH_HANG_KENDO;
    selectedItem: IKhachHang;
    modelSearch = {
        filter: null,
        trangThaiKhachHangs: null,
        loaiKhachHangs: null,
        nguonKhachHangs: null,
        nguoiPhuTrachs: null,
        thoiGianTu: null,
        thoiGianDen: null,
        kichBan: 0
    };

    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            trangThaiKhachHangs: this.modelSearch.trangThaiKhachHangs ? this.convertArrToStr(this.modelSearch.trangThaiKhachHangs) : null,
            loaiKhachHangs: this.modelSearch.loaiKhachHangs ? this.convertArrToStr(this.modelSearch.loaiKhachHangs) : null,
            nguonKhachHangs: this.modelSearch.nguonKhachHangs ? this.convertArrToStr(this.modelSearch.nguonKhachHangs) : null,
            nguoiPhuTrachs: this.modelSearch.nguoiPhuTrachs ? this.convertArrToStr(this.modelSearch.nguoiPhuTrachs) : null,
            thoiGianTu: this.modelSearch.thoiGianTu ? this.modelSearch.thoiGianTu : null,
            thoiGianDen: this.modelSearch.thoiGianDen ? this.modelSearch.thoiGianDen : null,
            kichBan: this.modelSearch.kichBan,
            ...this.queryOptions,
            isAsc: false,
            pageSize: 5,
        };
    }
	protected windowRef: WindowRef;
    constructor(
        injector: Injector,
    ) {
        super(injector)
        this.windowRef = injector.get(WindowRef)
    }


    ngOnInit(): void {
        super.ngOnInit();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onSearchChangeGrid(){
        this.loadItems();
    }


    loadItems() { 
		this.apiService.post(this.url, this.extendQueryOptions)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res && res.items) {
                    let data = res.items;
                    this.gridView$.data = data;
                    this.gridView$.total = res.pagingInfo.totalItems;
                }
            });
	}

    protected showFormCreateOrUpdate() {
		
    }

    resetHandler() {
        this.modelSearch = {
            filter: null,
            trangThaiKhachHangs: null,
            loaiKhachHangs: null,
            nguonKhachHangs: null,
            nguoiPhuTrachs: null,
            thoiGianTu: null,
            thoiGianDen: null,
            kichBan: 0
        };

        this.loadItems();
    }

	chonKhachHang() {
        if (this.selectedItem != null) {
            this.windowRef.close(this.selectedItem);
        } else {
            this.notification.show('Vui lòng chọn khách hàng', 'Cảnh báo', { status: 'warning' });
        }
    }
    selectRow(e: SelectionEvent) {
        if (e.selectedRows.length > 0) {
            this.selectedItem = e.selectedRows[0].dataItem;
        } else {
            this.selectedItem = null;
        }
    }
	closeForm(){
		this.windowRef.close();
	}
}
