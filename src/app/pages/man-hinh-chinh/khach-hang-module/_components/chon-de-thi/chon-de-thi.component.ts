import { Component, Injector, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { IDeThi } from '../../../kho-de-module/model/tao-de-thi.model';
import { BaseListComponent } from '../../base/base-list.component';
import { data } from './data.example';

@Component({
    selector: 'app-chon-de-thi',
    templateUrl: './chon-de-thi.component.html',
})
export class ChonDeThiComponent extends BaseListComponent<IDeThi> implements OnInit {
    url: string = UrlConstant.ROUTE.DE_THI_KENDO;
    protected windowRef: WindowRef;
    selectedItem: IDeThi;
    constructor(
        injector : Injector
    ) { 
        super(injector)
        this.windowRef = injector.get(WindowRef);
    }
    modelSearch = {
        filter: null,
        loaiDeThis: null,
        trangThaiDeThis: null,
    };
    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiDeThis: this.modelSearch.loaiDeThis ? this.convertArrToStr(this.modelSearch.loaiDeThis) : null,
            trangThaiDeThis: this.modelSearch.trangThaiDeThis ? this.convertArrToStr(this.modelSearch.trangThaiDeThis) : null,
            ...this.queryOptions,
        };
    }
    resetHandler(){
        this.modelSearch = {
            filter: null,
            loaiDeThis: null,
            trangThaiDeThis: null,
        };
        this.loadItems();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
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

    chonDeThi(){
        if(this.selectedItem != null){
            this.windowRef.close(this.selectedItem);
        }else{
            this.notification.show('Vui lòng chọn đề thi','Cảnh báo', { status :'warning' });
        }
    }
}
