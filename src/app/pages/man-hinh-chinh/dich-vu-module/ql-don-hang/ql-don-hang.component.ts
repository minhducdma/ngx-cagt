import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseListComponent } from '../base/base-list.component';
import { IDonHang } from '../model/don-hang.model';
import { FormQlDonHangComponent } from './form-ql-don-hang/form-ql-don-hang.component';

@Component({
    selector: 'app-ql-don-hang',
    templateUrl: './ql-don-hang.component.html',
    styleUrls: ['./ql-don-hang.component.scss']
})
export class QlDonHangComponent extends BaseListComponent<IDonHang> implements OnInit {
    url: string = UrlConstant.ROUTE.DON_HANG_KENDO;
    dichVuId: number;

    modelSearch = {
        filter: null,
        loaiDonHangs: null,
        trangThaiDonHangs: null,
    };

    constructor(
        injector: Injector,
    ) {
        super(injector)
    }

    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiDonHangs: this.modelSearch.loaiDonHangs ? this.convertArrToStr(this.modelSearch.loaiDonHangs) : null,
            trangThaiDonHangs: this.modelSearch.trangThaiDonHangs ? this.convertArrToStr(this.modelSearch.trangThaiDonHangs) : null,
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
            title: "Cập nhật đơn hàng",
            content: FormQlDonHangComponent,
            width: 800,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.dichVuId = this.dichVuId;
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
        // this.model = dataItem;
        // this.action = ActionEnum.UPDATE;
        // this.showFormCreateOrUpdate();
        this.router.navigate(["/pages/admin/dich-vu/ql-don-hang/" + dataItem.id]);

    }

    addHandler() {
        // this.model = undefined;
        // this.action = ActionEnum.CREATE;
        // this.showFormCreateOrUpdate();
        this.router.navigate(["/pages/admin/dich-vu/ql-don-hang/0"]);

    }

    resetHandler() {
        this.modelSearch = {
            filter: null,
            loaiDonHangs: null,
            trangThaiDonHangs: null,
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
            this.apiService.post('/dich-vu/delete-many-dich-vus', body).subscribe(res => {
                this.selectionIds = [];
                this.showMessage('success', 'Thành công', 'Xóa thành công');
                this.loadItems();
            });
        }
    }

}
