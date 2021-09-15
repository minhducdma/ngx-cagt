import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { FormImportKhachHangComponent } from '../../khach-hang-module/khach-hang/form-import-khach-hang/form-import-khach-hang.component';
import { BaseListComponent } from '../base/base-list.component';
import { IUser } from '../model/user.model';
import { FormImportNhanVienComponent } from './form-import-nhan-vien/form-import-nhan-vien.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseListComponent<IUser> implements OnInit {
  

  url: string = UrlConstant.ROUTE.NHAN_VIEN_KENDO;
    
    modelSearch = {
        filter: null,
        loaiNhanViens: null,
        trangThaiNhanViens: null,
        listRoles: null
    };
    currentGrid = this.gridView$;
    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            loaiLopHocs: this.modelSearch.loaiNhanViens ? this.convertArrToStr(this.modelSearch.loaiNhanViens) : null,
            trangThaiLopHocs: this.modelSearch.trangThaiNhanViens ? this.convertArrToStr(this.modelSearch.trangThaiNhanViens) : null,
            listRoles: this.modelSearch.listRoles ? this.convertArrToStr(this.modelSearch.listRoles) : null
        };
    }
    constructor( injector: Injector,) { 
        super(injector)
    }

    ngOnInit(): void  {
        super.ngOnInit();
    }
    loadItems(){
        this.currentGrid = this.gridView$;
        this.loadItemGrids(this.gridView$);
    }
    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
   }
    onSearchChangeGrid(){
        
        this.loadItemGrids(this.currentGrid);
    }
    loadItemGrids(gridView) {
        
        this.apiService.post(this.url, this.extendQueryOptions)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res && res.items) {
                    let data = res.items;
                    gridView.data = data;
                    gridView.total = res.pagingInfo.totalItems;
                }
            });
    }
    resetHandler() {
        this.modelSearch = {
            filter: null,
            loaiNhanViens: null,
            trangThaiNhanViens: null,
            listRoles: null
        };

        this.loadItemGrids(this.currentGrid);
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
    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.action == ActionEnum.UPDATE ? 'Cập nhật nhân viên' : 'Thêm mới nhân viên',
            content: FormImportNhanVienComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemGrids(this.currentGrid);
            }
        });
    }
    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.userId);
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
                        console.log(body);
                        this.apiService.post('/nhan-vien/delete-many-nhan-viens', body).subscribe(res => {
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
