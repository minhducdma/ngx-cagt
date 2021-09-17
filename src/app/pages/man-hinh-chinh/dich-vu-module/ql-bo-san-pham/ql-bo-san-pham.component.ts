import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult, WindowRef } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseListComponent } from '../base/base-list.component';
import { IBoSanPham } from '../model/bo-san-pham.model';
import { FormQlBoSanPhamComponent } from './form-ql-bo-san-pham/form-ql-bo-san-pham.component';

@Component({
    selector: 'app-ql-bo-san-pham',
    templateUrl: './ql-bo-san-pham.component.html',
    styleUrls: ['./ql-bo-san-pham.component.scss']
})
export class QlBoSanPhamComponent extends BaseListComponent<IBoSanPham> implements OnInit {
    url: string = UrlConstant.ROUTE.BO_SAN_PHAM_KENDO;
    isChild: false;
    modelSearch = {
        filter: null,
        loaiBoSanPhams: null,
        trangThaiBoSanPhams: null
    };
    selectedItem: IBoSanPham;

    protected windowRef: WindowRef;
    constructor(
        injector: Injector,
        
    ) {
        super(injector)
        this.windowRef = injector.get(WindowRef)

    }

    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiBoSanPhams: this.modelSearch.loaiBoSanPhams ? this.convertArrToStr(this.modelSearch.loaiBoSanPhams) : null,
            trangThaiBoSanPhams: this.modelSearch.trangThaiBoSanPhams ? this.convertArrToStr(this.modelSearch.trangThaiBoSanPhams) : null,
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
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Cập nhật bộ sản phẩm",
            content: FormQlBoSanPhamComponent,
            width: 800,
            top: 200,
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
            loaiBoSanPhams: null,
            trangThaiBoSanPhams: null
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
                listIds: [...new Set(this.selectionIds)],
            };
            this.apiService.post('/bo-san-pham/delete-many-bo-san-phams', body).subscribe(res => {
                this.selectionIds = [];
                this.showMessage('success', 'Thành công', 'Xóa thành công');
                this.loadItems();
            });
        }
    }


    closeForm() {
        this.windowRef.close();
    }

    chonBoSanPham(){
        if(this.selectedItem != null){
            this.windowRef.close(this.selectedItem);
        }else{
            this.notification.show('Vui lòng chọn bộ sản phẩm','Cảnh báo', { status :'warning' });
        }
    }
    selectRow(e: SelectionEvent) {
        if(e.selectedRows.length > 0){
            this.selectedItem = e.selectedRows[0].dataItem;
        }else{
            this.selectedItem = null;
        }
    }
}