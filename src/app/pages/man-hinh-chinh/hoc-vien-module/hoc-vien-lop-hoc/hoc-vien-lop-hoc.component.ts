import { Component, Injector, OnInit } from '@angular/core';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { EKichBanCSKH } from '../../khach-hang-module/base/base.enum';
import { FormChamSocKhachHangComponent } from '../../khach-hang-module/cham-soc-khach-hang/form-cham-soc-khach-hang/form-cham-soc-khach-hang.component';
import { FormImportKhachHangComponent } from '../../khach-hang-module/khach-hang/form-import-khach-hang/form-import-khach-hang.component';
import { FormKhachHangComponent } from '../../khach-hang-module/khach-hang/form-khach-hang/form-khach-hang.component';
import { IKhachHang } from '../../khach-hang-module/model/khach-hang.model';
import { BaseListComponent } from '../base/base-list.component';
// import { IHocVienLopHoc } from '../model/hoc-vien-lop-hoc.model';

@Component({
  selector: 'app-hoc-vien-lop-hoc',
  templateUrl: './hoc-vien-lop-hoc.component.html',
  styleUrls: ['./hoc-vien-lop-hoc.component.scss']
})
export class HocVienLopHocComponent extends BaseListComponent<IKhachHang> implements OnInit {
    url: string = UrlConstant.ROUTE.KHACH_HANG_KENDO;
    modelSearch = {
        filter: null,
        trangThaiKhachHangs: null,
        loaiKhachHangs: null,
        nguonKhachHangs: null,
        nguoiPhuTrachs: null,
        thoiGianTu: null,
        thoiGianDen: null,
        kichBan: 0,
        isHocVien: true
    };

    currentGrid = this.gridView$;

    gridViewKB1$ = {
        data: [],
        total: 0
    };
    gridViewKB2$ = {
        data: [],
        total: 0
    };
    gridViewKB3$ = {
        data: [],
        total: 0
    };
    gridViewKB4$ = {
        data: [],
        total: 0
    };

    public get EKichBanCSKH(): typeof EKichBanCSKH {
        return EKichBanCSKH;
    }

    private get extendQueryOptions() {
        return {
            filter: this.modelSearch.filter ? this.modelSearch.filter : null,
            trangThaiKhachHangs: this.modelSearch.trangThaiKhachHangs ? this.modelSearch.trangThaiKhachHangs : null,
            loaiKhachHangs: this.modelSearch.loaiKhachHangs ? this.convertArrToStr(this.modelSearch.loaiKhachHangs) : null,
            nguonKhachHangs: this.modelSearch.nguonKhachHangs ? this.convertArrToStr(this.modelSearch.nguonKhachHangs) : null,
            nguoiPhuTrachs: this.modelSearch.nguoiPhuTrachs ? this.convertArrToStr(this.modelSearch.nguoiPhuTrachs) : null,
            thoiGianTu: this.modelSearch.thoiGianTu ? this.modelSearch.thoiGianTu : null,
            thoiGianDen: this.modelSearch.thoiGianDen ? this.modelSearch.thoiGianDen : null,
            kichBan: this.modelSearch.kichBan,
            ...this.queryOptions,
            isAsc: false,
        };
    }

    constructor(
        injector: Injector,
    ) {
        super(injector)
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItemGrids(this.currentGrid);
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

    loadItems() {
        this.currentGrid = this.gridView$;
        this.loadItemGrids(this.gridView$);
        
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.action == ActionEnum.UPDATE ? 'Cập nhật khách hàng' : 'Thêm mới khách hàng',
            content: FormKhachHangComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        this.model.isHocVien = true;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemGrids(this.currentGrid);
            }
        });
    }
    protected showFormCSKHUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chăm sóc khách hàng',
            content: FormChamSocKhachHangComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.isChild = true;

        windowRef.result.subscribe(result => {

            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemGrids(this.currentGrid);
            }
        });
    }
    editHandlerCSKH(dataItem) {
        // tslint:disable-next-line: no-unsafe-any
        this.model = dataItem;
        this.action = ActionEnum.CREATE;
        this.showFormCSKHUpdate();
    }

    editHandler(dataItem) {
        // tslint:disable-next-line: no-unsafe-any
        this.model = dataItem;
        this.model.isHocVien = true;
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


    resetHandler() {
        this.modelSearch = {
            filter: null,
            trangThaiKhachHangs: null,
            loaiKhachHangs: null,
            nguonKhachHangs: null,
            nguoiPhuTrachs: null,
            thoiGianTu: null,
            thoiGianDen: null,
            kichBan: 0,
            isHocVien: true
        };

        this.loadItemGrids(this.currentGrid);
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
        alert("Chức năng đang được cập nhật !");
    }

    // statusHandler(dataItem: IKhachHang, status?: EKhachHang) {
    //     if (status) {
    //         let _content = TrangThaiChamSoc1Component;
    //         let _title = "";
    //         switch (status) {
    //             case EKhachHang.Status01:
    //                 _content = TrangThaiChamSoc1Component;
    //                 _title = 'Chuyển trạng thái - Đăng ký';
    //                 break;
    //             case EKhachHang.Status02:
    //                 _content = TrangThaiChamSoc2Component;
    //                 _title = 'Chuyển trạng thái - Liên hệ';
    //                 break;
    //             case EKhachHang.Status03:
    //                 _content = TrangThaiChamSoc3Component;
    //                 _title = 'Chuyển trạng thái - Hoàn tất';
    //                 break;
    //         }
    //         this.opened = true;
    //         const windowRef = this.windowService.open({
    //             title: _title,
    //             content: _content,
    //             width: 800,
    //             top: 10,
    //             autoFocusedElement: 'body',
    //         });
    //         const param = windowRef.content.instance;
    //         param.action = this.action;
    //         param.model = this.model;

    //         windowRef.result.subscribe(result => {
    //             if (result instanceof WindowCloseResult) {
    //                 this.opened = false;
    //                 this.loadItemGrids();
    //             }
    //         });
    //     }
    //     else {
    //         alert("Trạng thái không tồn tại !");
    //     }

    // }

    // selectTab(kichBan) {
    //     switch (kichBan.tabTitle) {
    //         case "Kịch bản 1":
    //             this.modelSearch.kichBan = EKichBanCSKH.KichBan1;
    //             this.currentGrid = this.gridViewKB1$;
    //             this.loadItemGrids(this.gridViewKB1$);
    //             break;
    //         case "Kịch bản 2":
    //             this.modelSearch.kichBan = EKichBanCSKH.KichBan2;
    //             this.currentGrid = this.gridViewKB2$;
    //             this.loadItemGrids(this.gridViewKB2$);
    //             break;
    //         case "Kịch bản 3":
    //             this.modelSearch.kichBan = EKichBanCSKH.KichBan3;
    //             this.currentGrid = this.gridViewKB3$;
    //             this.loadItemGrids(this.gridViewKB3$);
    //             break;
    //         case "Kịch bản 4":
    //             this.modelSearch.kichBan = EKichBanCSKH.KichBan4;
    //             this.currentGrid = this.gridViewKB4$;
    //             this.loadItemGrids(this.gridViewKB4$);
    //             break;

    //         default:
    //             this.modelSearch.kichBan = 0;
    //             this.currentGrid = this.gridView$;
    //             this.loadItemGrids(this.gridView$);
    //             break;
    //     }
    // }

    completeCSKH(isOpenPopup){
        this.opened = isOpenPopup;
    }
}