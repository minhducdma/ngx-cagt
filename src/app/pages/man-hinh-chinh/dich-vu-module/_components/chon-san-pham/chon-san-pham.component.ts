import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { BaseListComponent } from '../../base/base-list.component';
import { ISanPham } from '../../model/san-pham.model';

@Component({
    selector: 'app-chon-san-pham',
    templateUrl: './chon-san-pham.component.html',
    styleUrls: ['./chon-san-pham.component.scss']
})
export class ChonSanPhamComponent extends BaseListComponent<ISanPham> implements OnInit {
    url: string = UrlConstant.ROUTE.SAN_PHAM_KENDO;
    modelSearch = {
        dichVuIds: [],
        boSanPhamIds: [],
        filter: null,
        loaiSanPhams: null,
        trangThaiSanPhams: null,
    };
    selectedItem: ISanPham;
	protected windowRef: WindowRef;
    constructor(
        injector: Injector,
    ) {
        super(injector)
        this.windowRef = injector.get(WindowRef)
    }

    private get extendQueryOptions() {
        return {
            dichVuIds: this.modelSearch.dichVuIds.length > 0 ? this.modelSearch.dichVuIds.map(x => Number(x)) : [],
            boSanPhamIds: this.modelSearch.boSanPhamIds.length > 0 ? this.modelSearch.boSanPhamIds.map(x => Number(x)) : [],
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiSanPhams: this.modelSearch.loaiSanPhams ? this.convertArrToStr(this.modelSearch.loaiSanPhams) : null,
            trangThaiSanPhams: this.modelSearch.trangThaiSanPhams ? this.convertArrToStr(this.modelSearch.trangThaiSanPhams) : null,
            ...this.queryOptions,
            pageSize: 5,
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
            dichVuIds: [],
            boSanPhamIds: [],
            filter: null,
            loaiSanPhams: null,
            trangThaiSanPhams: null,
        };

        this.loadItems();
    }

    chonSanPham() {
        if (this.selectedItem != null) {
            this.windowRef.close(this.selectedItem);
        } else {
            this.notification.show('Vui lòng chọn sản phẩm', 'Cảnh báo', { status: 'warning' });
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