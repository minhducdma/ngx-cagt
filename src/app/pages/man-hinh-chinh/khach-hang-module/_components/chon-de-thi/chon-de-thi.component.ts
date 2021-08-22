import { Component, Injector, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { IDeThi } from '../../../kho-de-module/model/tao-de-thi.model';
import { BaseListComponent } from '../../base/base-list.component';
import { data } from './data.example';

@Component({
    selector: 'app-chon-de-thi',
    templateUrl: './chon-de-thi.component.html',
})
export class ChonDeThiComponent extends BaseListComponent<IDeThi> implements OnInit {
    protected windowRef: WindowRef;
    selectedItem: IDeThi;
    constructor(
        injector : Injector
    ) { 
        super(injector)
        this.windowRef = injector.get(WindowRef);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
    }
    loadItems() {
        this.gridView$.data = data.items;
        this.gridView$.total = data.totalCount;
    }

    selectRow(e: SelectionEvent) {
        if(e.selectedRows.length > 0){
            this.selectedItem = e.selectedRows[0].dataItem;
        }else{
            this.selectedItem = null;
        }
    }
    closeForm() {
        this.windowRef.close();
    }

    chonDeThi(){
        if(this.selectedItem != null){
            this.windowRef.close(this.selectedItem);
        }else{
            this.notification.show('Vui lòng chọn đề thi','Cảnh báo', { status :'warning' });
        }
    }
}
