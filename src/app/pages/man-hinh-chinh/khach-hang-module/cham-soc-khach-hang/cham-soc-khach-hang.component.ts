import { Component, Injector, Input, OnInit } from '@angular/core';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseListComponent } from '../base/base-list.component';
import { IChamSocKhachHang } from '../model/cham-soc-khach-hang.model';
import { FormChamSocKhachHangComponent } from './form-cham-soc-khach-hang/form-cham-soc-khach-hang.component';

@Component({
    selector: 'ngx-cham-soc-khach-hang',
    templateUrl: './cham-soc-khach-hang.component.html',
    styleUrls: ['./cham-soc-khach-hang.component.scss'],
})
export class ChamSocKhachHangComponent extends BaseListComponent<IChamSocKhachHang> implements OnInit {
    @Input() isChild = false;
  
    url: string = UrlConstant.ROUTE.CHAM_SOC_KHACH_HANG;
    modelSearch = {
        filter: null,
        ngayChamSocTu: null,
        ngayChamSocDen: null,
        loaiChamSoc: null,
    };

    gridDaChamSoc$ = {
        data: [],
        total: 0
    };

    constructor(
        injector: Injector,
    ) {
        super(injector)
    }
    private get extendQueryOptions() {
        return {
            keyword: this.modelSearch.filter ? this.modelSearch.filter : null,
            ngayChamSocTu: this.modelSearch.ngayChamSocTu ? this.modelSearch.ngayChamSocTu : null,
            ngayChamSocDen: this.modelSearch.ngayChamSocDen ? this.modelSearch.ngayChamSocDen : null,
            loaiChamSoc: this.modelSearch.loaiChamSoc ? this.convertArrToStr(this.modelSearch.loaiChamSoc) : null,
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


    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Chăm sóc khách hàng",
            content: FormChamSocKhachHangComponent,
            width: 900,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

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
            ngayChamSocTu: null,
            ngayChamSocDen: null,
            loaiChamSoc: null,
        };
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
            this.apiService.post(this.url + '/many-khach-hangs', body).subscribe(res => {
                this.selectionIds = [];
                alert('Xóa thành công');
                this.loadItems();
            });
        }
    }

    importHandler() {
        alert("Chức năng đang được cập nhật !");
    }
    exportHandler() {
        alert("Chức năng đang được cập nhật !");
    }

}