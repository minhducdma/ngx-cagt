import { Component, Injector, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { FormKhachHangComponent } from './form-khach-hang/form-khach-hang.component';
import { ActionEnum } from '../../../@core/constants/enum.constant';
import { IKhachHang } from '../model/khach-hang.model';
import { UrlConstant } from '../../../@core/constants/url.constant';
import {BaseKhachHangListComponent} from '../base/base-khach-hang-list.component'
@Component({
    selector: 'ngx-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['.//khach-hang.component.scss'],
})
export class KhachHangComponent extends BaseKhachHangListComponent<IKhachHang> implements OnInit {
    url: string = UrlConstant.ROUTE.KHACH_HANG;
    constructor(
        injector: Injector
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
        this.windowService.open(
            FormKhachHangComponent,
            {
                title:'Cập nhật khách hàng',
                buttons: this.buttonsConfig,
                context:{
                    action: this.action,
                    model: this.model
                }
            }
        ).onClose.subscribe(res=>{this.loadItems()});
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

    removeHandler(item) {

    }

    
    valuex:string="8";
    test() {
        console.log(this.valuex);
    }
}
