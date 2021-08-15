import { Component, Injector, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { FormChamSocKhachHangComponent } from './form-cham-soc-khach-hang/form-cham-soc-khach-hang.component';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../../@core/constants/url.constant';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { BaseListComponent } from '../../base/base-list.component';
import { IKhachHang } from '../../model/khach-hang.model';
@Component({
    selector: 'ngx-cham-soc-khach-hang',
    templateUrl: './cham-soc-khach-hang.component.html',
    styleUrls: ['./cham-soc-khach-hang.component.scss'],
})
export class ChamSocKhachHangComponent extends BaseListComponent<IKhachHang> implements OnInit {
    duration = 20;
    url: string = UrlConstant.ROUTE.KHACH_HANG;
    constructor(
        injector: Injector,
        protected windowService2: WindowService,

    ) {
        super(injector)
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    loadItems() {
        this.apiService.get(this.url, {})
            .subscribe((res: any) => {
                if (res && res.items) {
                    this.gridView$.data = res.items;
                    this.gridView$.total = res.totalCount;
                }
            });
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService2.open({
            title: "Chăm sóc khách hàng",
            content: FormChamSocKhachHangComponent,
            width: 900,
            top: 10,
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
  
}