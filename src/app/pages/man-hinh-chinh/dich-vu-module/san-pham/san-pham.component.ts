import { Component, Injector, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseListComponent } from '../base/base-list.component';
import { ISanPham } from '../model/san-pham.model';
import { FormSanPhamComponent } from './form-san-pham/form-san-pham.component';

@Component({
    selector: 'app-san-pham',
    templateUrl: './san-pham.component.html',
    styleUrls: ['./san-pham.component.scss']
})
export class SanPhamComponent extends BaseListComponent<ISanPham> implements OnInit {
    url: string = UrlConstant.ROUTE.SAN_PHAM_KENDO;
    dichVuId: number;
    isChild: false;

    modelSearch = {
        dichVuIds: [],
        filter: null,
        loaiSanPhams: null,
        trangThaiSanPhams: null,
    };

    constructor(
        injector: Injector,
        private route: ActivatedRoute,
    ) {
        super(injector)
        this.route.paramMap.subscribe(params => {
            this.modelSearch.dichVuIds = [];
            this.ngOnInit();
        });
    }

    private get extendQueryOptions() {
        return {
            dichVuIds: this.modelSearch.dichVuIds,
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiSanPhams: this.modelSearch.loaiSanPhams ? this.convertArrToStr(this.modelSearch.loaiSanPhams) : null,
            trangThaiSanPhams: this.modelSearch.trangThaiSanPhams ? this.convertArrToStr(this.modelSearch.trangThaiSanPhams) : null,
            ...this.queryOptions,
        };
    }

    ngOnInit(): void {
        this.dichVuId = this.route.snapshot.params.dichVuId;
        this.modelSearch.dichVuIds.push(this.dichVuId);
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
            title: "Cập nhật sản phẩm",
            content: FormSanPhamComponent,
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
            dichVuIds: [this.dichVuId],
            filter: null,
            loaiSanPhams: null,
            trangThaiSanPhams: null,
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