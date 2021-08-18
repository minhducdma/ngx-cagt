import { Component, Injector, OnInit } from '@angular/core';
import { BaseListComponent } from '../base/base-list.component';
import { IDeThi } from '../model/de-thi.model';
import { data } from './data.example';

@Component({
    selector: 'app-quan-ly-de-thi',
    templateUrl: './quan-ly-de-thi.component.html',
    styleUrls: ['./quan-ly-de-thi.component.scss']
})
export class QuanLyDeThiComponent extends BaseListComponent<IDeThi> implements OnInit {
  
    constructor(
        injector : Injector
    ) { 
        super(injector)
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


}
