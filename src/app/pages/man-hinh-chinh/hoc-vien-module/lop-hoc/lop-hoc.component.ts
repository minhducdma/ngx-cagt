import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { FormImportKhachHangComponent } from '../../khach-hang-module/khach-hang/form-import-khach-hang/form-import-khach-hang.component';
import { BaseListComponent } from '../base/base-list.component';
import { ILopHoc } from '../model/lop-hoc.model';


@Component({
  selector: 'ngx-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  styleUrls: ['./lop-hoc.component.scss']
})
export class LopHocComponent extends BaseListComponent<ILopHoc> implements OnInit {
    
    url: string = UrlConstant.ROUTE.LOAD_LOP_HOC;
    
    modelSearch = {
        filter: null,
        thoiGianTu: null,
        thoiGianDen: null
    };
    currentGrid = this.gridView$;
    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null
        };
    }
    constructor( injector: Injector,) { 
        super(injector)
    }
  
    ngOnInit(): void  {
        super.ngOnInit();
    }
    protected showFormCreateOrUpdate() {
        throw new Error('Method not implemented.');
    }
    loadItems(){
        
        this.currentGrid = this.gridView$;
        this.loadItemGrids(this.gridView$);
    }
    onSearchChangeGrid(){
        this.loadItemGrids(this.currentGrid);
    }
    loadItemGrids(gridView) {
        
        this.apiService.get('https://apisipm.cagt.top/api/app/lop-hoc', this.extendQueryOptions)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res && res.items) {
                    let data = res.items;
                    gridView.data = data;
                    // gridView.total = res.totalCount;
                   
                }
            });
    }
    resetHandler() {
        this.modelSearch = {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            thoiGianTu: this.modelSearch.thoiGianTu ? this.modelSearch.thoiGianTu : null,
            thoiGianDen: this.modelSearch.thoiGianDen ? this.modelSearch.thoiGianDen : null
        };

        this.loadItemGrids(this.currentGrid);
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
                            this.loadItemGrids(this.currentGrid);
                        });
                    }
                }
            });
    }
    importHandler() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Import dữ liệu khách hàng',
            content: FormImportKhachHangComponent,
            width: 800,
            top: 100,
            autoFocusedElement: 'body',
        });
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemGrids(this.currentGrid);
            }
        });
    }

    exportHandler() {
        // this.apiService.get('https://apisipm.cagt.top/api/app/lop-hoc', this.extendQueryOptions)
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe((res: any) => {
        //         if (res && res.items) {
        //             let data = res.items;
        //             console.log(data);
        //         }
        //     });
        alert("Chức năng đang được cập nhật !");
    }
}