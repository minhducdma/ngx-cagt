import { Component, Injector, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { KhachHangExampleData } from '../../../@core/data/khach-hang-demo';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { CustomerDataExample } from './example-data';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { BaseKhachHangListComponent } from './base_khach_hang/base-khach-hang-list.component';
import { finalize, map, tap } from 'rxjs/operators';
import { IPagedResult } from '../../../shared/models/response-data.model';
import { PageConfig } from '../../../@core/constants/app.constant';

@Component({
    selector: 'ngx-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['.//khach-hang.component.scss'],
})
export class KhachHangComponent extends BaseKhachHangListComponent<IKhachHang> implements OnInit {

    constructor(
        injector : Injector
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
        this.apiService.get('https://apisipm.migroup.asia/api/app/khach-hangs', {})
        .subscribe((res : any) => {
            if(res && res.items){
                this.gridView$.data = res.items;
                this.gridView$.total = res.totalCount;
            }
        });
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Cập nhật',
            content: 'test',
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.loadItems();
            }
            this.opened = false;
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
}


export interface IKhachHang {
    id: 5;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: string;
    diaChi: string;
    soDienThoai: string;
    email: string;
    loaiKhachHang: string;
}
export enum ActionEnum {
    CREATE = 1,
    UPDATE = 2,
    DUPLICATE = 3,
    DELETE = 4,
    VIEW = 5,
    APPROVE = 6
}
