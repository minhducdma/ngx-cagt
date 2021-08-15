import { Component, Injector, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { FormKhachHangComponent } from './form-khach-hang/form-khach-hang.component';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormImportKhachHangComponent } from './form-import-khach-hang/form-import-khach-hang.component';
import { ChamSocKhachHangComponent } from './cham-soc-khach-hang/cham-soc-khach-hang.component';
import { BaseListComponent } from '../base/base-list.component';
import { IKhachHang } from '../model/khach-hang.model';
@Component({
    selector: 'ngx-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['.//khach-hang.component.scss'],
})
export class KhachHangComponent extends BaseListComponent<IKhachHang> implements OnInit {
    url: string = UrlConstant.ROUTE.KHACH_HANG;
    modelSearch = {
        keyword: '', 
        doanhThuTu: null,
        doanhThuDen: null,
        nguonKhachHang: '',
        thoiGianTu: null,
        thoiGianDen: null,
        loaiKhachHang: '',
        danhSachNhanVien: ''
    }

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
        this.apiService.get(this.url, {
            // ...this.modelSearch,
            // ...this.queryOptions
        })
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
            title:  this.action == ActionEnum.UPDATE ? 'Cập nhật khách hàng' : 'Thêm mới khách hàng',
            content: FormKhachHangComponent,
            width: 900,
            top: 60,
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
    protected showFormCSKHUpdate() {
        this.opened = true;
        const windowRef = this.windowService2.open({
            title: 'Cập nhật khách hàng',
            content: ChamSocKhachHangComponent,
            width: 1200,
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
    editHandlerCSKH (dataItem) {
        // tslint:disable-next-line: no-unsafe-any
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCSKHUpdate();
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

    resetHandler() {
        this.modelSearch = {
            keyword: '', 
            doanhThuTu: null,
            doanhThuDen: null,
            nguonKhachHang: '',
            thoiGianTu: null,
            thoiGianDen: null,
            loaiKhachHang: '',
            danhSachNhanVien: ''
        };
    }

    importHandler() { 
        this.opened = true;
        const windowRef = this.windowService2.open({
            title: 'Import dữ liệu khách hàng',
            content: FormImportKhachHangComponent,
            width: 800,
            top: 60,
            autoFocusedElement: 'body',
        }); 
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    exportHandler() {
        alert("Chức năng đang được cập nhật !"); 
    }
}
 