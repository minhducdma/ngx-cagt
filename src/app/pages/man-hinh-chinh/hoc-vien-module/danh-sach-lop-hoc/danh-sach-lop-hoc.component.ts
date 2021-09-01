import { Component, Injector, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { BaseListComponent } from '../base/base-list.component';
import { ILopHoc } from '../model/lop-hoc-model';

@Component({
    selector: 'ngx-danh-sach-lop-hoc',
    templateUrl: './danh-sach-lop-hoc.component.html',
    styleUrls: ['./danh-sach-lop-hoc.component.scss']
})
export class DanhSachLopHocComponent extends BaseListComponent<ILopHoc> implements OnInit {
    url: string = UrlConstant.ROUTE.LOAD_LOP_HOC;

    modelSearch = {
        filter: null,
        thoiGianTu: null,
        thoiGianDen: null,
        loaiLopHocs: null,
        trangThaiLopHocs: null
    };
    public exampleData: Array<Select2OptionData>;
    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            thoiGianTu: this.modelSearch.thoiGianTu ? this.modelSearch.thoiGianTu : null,
            thoiGianDen: this.modelSearch.thoiGianDen ? this.modelSearch.thoiGianDen : null,
            loaiLopHocs: this.modelSearch.loaiLopHocs ? this.convertArrToStr(this.modelSearch.loaiLopHocs) : null,
            trangThaiLopHocs: this.modelSearch.trangThaiLopHocs ? this.convertArrToStr(this.modelSearch.trangThaiLopHocs) : null
        };
    }
    constructor(injector: Injector,) {
        super(injector)
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.exampleData = [
            {
              id: 'basic1',
              text: 'Basic 1'
            },
            {
              id: 'basic2',
              disabled: true,
              text: 'Basic 2'
            },
            {
              id: 'basic3',
              text: 'Basic 3'
            },
            {
              id: 'basic4',
              text: 'Basic 4'
            }
          ];
    }
    protected showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
    }
    loadItems() {
        this.apiService.get(this.url, this.extendQueryOptions)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res && res.items) {
                    this.gridView$.data =  res.items;
                    this.gridView$.total = res.pagingInfo.totalItems;
                }
            });
    }
    resetHandler() {
        this.modelSearch = {
            filter: null,
            thoiGianTu: null,
            thoiGianDen: null,
            loaiLopHocs: null,
            trangThaiLopHocs: null
        };
        this.loadItems();
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
                        this.apiService.post('/khach-hangs/delete-many-khach-hangs', body).subscribe(res => {
                            this.selectionIds = [];
                            this.showMessage('success', 'Thành công', 'Xóa thành công');
                            this.loadItems();
                        });
                    }
                }
            });
    }
}
