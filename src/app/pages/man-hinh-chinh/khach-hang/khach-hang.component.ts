import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { KhachHangExampleData } from '../../../@core/data/khach-hang-demo';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { CustomerDataExample } from './example-data';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { FormKhachHangComponent } from './form-khach-hang/form-khach-hang.component';
import {FormChamSocKhachHangComponent  } from './form-cham-soc-khach-hang/form-cham-soc-khach-hang.component';

@Component({
    selector: 'ngx-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['.//khach-hang.component.scss'],
})
export class KhachHangComponent implements OnInit {
    model: IKhachHang;
    protected action: ActionEnum;
    public gridData: GridDataResult;
    source: LocalDataSource = new LocalDataSource();
    isLoading = false;
    opened = false;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    selectionIds: number[] = [];

    constructor(
        private service: KhachHangExampleData,
        protected windowService: WindowService
    ) {
        const data = this.service.getData();
        this.source.load(data);
    }

    ngOnInit(): void {
        this.loadItems();
    }

    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'ID',
                type: 'number',
            },
            hoTen: {
                title: 'Họ tên',
                type: 'string',
            },
            ngaySinh: {
                title: 'Ngày sinh',
                type: 'string',
            },
            gioiTinh: {
                title: 'Giới tính',
                type: 'string',
            },
            diaChi: {
                title: 'Địa chỉ',
                type: 'string',
            },
            soDienThoai: {
                title: 'Số điện thoại',
                type: 'string',
            },
            email: {
                title: 'Email',
                type: 'string',
            },
            loaiKhachHang: {
                title: 'Loại khách hàng',
                type: 'string',
            },
        },
    };

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    loadItems() {

        this.gridData = {
            data: CustomerDataExample.results.items,
            total: CustomerDataExample.results.pagingInfo.totalItems,
        }
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            // title: 'Cập nhật',
            // content: 'test',
            // width: 850,
            // top: 10,
            // autoFocusedElement: 'body',

            title:'Cập nhật',
            content: FormKhachHangComponent,
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
    protected showFormCreateCSKH() {
        this.opened = true;
        const windowRef = this.windowService.open({
            // title: 'Cập nhật',
            // content: 'test',
            // width: 850,
            // top: 10,
            // autoFocusedElement: 'body',

            title:'Chăm sóc khách hàng',
            content: FormChamSocKhachHangComponent,
            width: 1100,
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
        // this.showFormCreateOrUpdate();
        this.showFormCreateCSKH();
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
