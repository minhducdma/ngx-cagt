import { Component, Injector, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { BaseListComponent } from '../base/base-list.component';
import { IDeThi } from '../model/de-thi.model';
import { data } from './data.example';

@Component({
    selector: 'app-quan-ly-de-thi',
    templateUrl: './quan-ly-de-thi.component.html',
    styleUrls: ['./quan-ly-de-thi.component.scss']
})
export class QuanLyDeThiComponent extends BaseListComponent<IDeThi> implements OnInit {
    url: string = UrlConstant.ROUTE.DE_THI_KENDO;
    constructor(
        injector : Injector
    ) { 
        super(injector)
    }
    modelSearch = {
        filter: null,
        loaiDeThis: null,
        trangThaiDeThis: null,
    };

    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiDeThis: this.modelSearch.loaiDeThis ? this.convertArrToStr(this.modelSearch.loaiDeThis) : null,
            trangThaiDeThis: this.modelSearch.trangThaiDeThis ? this.convertArrToStr(this.modelSearch.trangThaiDeThis) : null,
            ...this.queryOptions,
        };
    }

    resetHandler(){
        this.modelSearch = {
            filter: null,
            loaiDeThis: null,
            trangThaiDeThis: null,
        };
        this.loadItems();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
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
    addHandler(){
        this.router.navigate(["/pages/admin/kho-de/tao-de-thi/0"]);
    }

    editHandler(dataItem : IDeThi){
        this.router.navigate(["/pages/admin/kho-de/tao-de-thi/" + dataItem.id]);
    }
    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    removeSelectedHandler() {
        this.dialogService.open(AlertDialogComponent, {
            context: {
                title: 'Xác nhận xóa',
                message: 'Bạn có chắc chắn muốn xóa?',
            },
        }).onClose
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res) {
                    if (this.selectionIds.length > 0) {
                        const body = [...new Set(this.selectionIds)]
                        this.apiService.post('/de-thi/delete-many-de-this', body).subscribe(res => {
                            this.selectionIds = [];
                            this.showMessage('success', 'Thành công', 'Xóa thành công');
                            this.loadItems();
                        });
                    }
                }
            });
    }

    testExam(dataItem){
        this.router.navigate(["/pages/admin/kho-de/" + dataItem.id + "/user/0"]);
    }

}
