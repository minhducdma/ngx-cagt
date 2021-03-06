import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseListComponent } from '../base/base-list.component';
import { IDichVu } from '../model/dich-vu.model';
import { FormQlDichVuComponent } from './form-ql-dich-vu/form-ql-dich-vu.component';

@Component({
    selector: 'app-ql-dich-vu',
    templateUrl: './ql-dich-vu.component.html',
    styleUrls: ['./ql-dich-vu.component.scss']
})
export class QlDichVuComponent extends BaseListComponent<IDichVu> implements OnInit {
    url: string = UrlConstant.ROUTE.DICH_VU_KENDO;

    modelSearch = {
        filter: null,
        loaiDichVu: null,
        trangThaiDichVu: null
    };

    constructor(
        injector: Injector,
    ) {
        super(injector)
    }

    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiDichVus: this.modelSearch.loaiDichVu ? this.convertArrToStr(this.modelSearch.loaiDichVu) : null,
            trangThaiDichVus: this.modelSearch.trangThaiDichVu ? this.convertArrToStr(this.modelSearch.trangThaiDichVu) : null,
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
            title: "C???p nh???t d???ch v???",
            content: FormQlDichVuComponent,
            width: 800,
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
                window.location.reload();
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
            loaiDichVu: null,
            trangThaiDichVu: null
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
                this.showMessage('success', 'Th??nh c??ng', 'X??a th??nh c??ng');
                this.loadItems();
                window.location.reload();
            });
        }
    }

}