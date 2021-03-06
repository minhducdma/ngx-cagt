import { Component, Injector, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { FormKhachHangComponent } from './form-khach-hang/form-khach-hang.component';
import { ActionEnum } from '../../../../@core/constants/enum.constant';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormImportKhachHangComponent } from './form-import-khach-hang/form-import-khach-hang.component';
import { ChamSocKhachHangComponent } from '../cham-soc-khach-hang/cham-soc-khach-hang.component';
import { BaseListComponent } from '../base/base-list.component';
import { IKhachHang } from '../model/khach-hang.model';
import { EKhachHang, EKichBanCSKH, EKichBanKH } from '../base/base.enum';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { FormChamSocKhachHangComponent } from '../cham-soc-khach-hang/form-cham-soc-khach-hang/form-cham-soc-khach-hang.component';






@Component({
    selector: 'ngx-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['./khach-hang.component.scss'],
})
export class KhachHangComponent extends BaseListComponent<IKhachHang> implements OnInit {
    url: string = UrlConstant.ROUTE.KHACH_HANG_KENDO;
    modelSearch = {
        filter: null,
        trangThaiKhachHangs: null,
        loaiKhachHangs: null,
        nguonKhachHangs: null,
        nguoiPhuTrachs: null,
        thoiGianTu: null,
        thoiGianDen: null,
        kichBan: 0
    };

    currentGrid = this.gridView$;
    select2data = []

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
            trangThaiKhachHangs: this.modelSearch.trangThaiKhachHangs ? this.convertArrToStr(this.modelSearch.trangThaiKhachHangs) : null,
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

    loadItems() { }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.action == ActionEnum.UPDATE ? 'C???p nh???t kh??ch h??ng' : 'Th??m m???i kh??ch h??ng',
            content: FormKhachHangComponent,
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
    protected showFormCSKHUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Ch??m s??c kh??ch h??ng',
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
                title: 'X??c nh???n x??a',
                message: 'B???n c?? ch???c ch???n mu???n x??a?',
            },
        }).onClose
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res) {
                    if (this.selectionIds.length > 0) {
                        const body = [...new Set(this.selectionIds)]
                        this.apiService.post('/khach-hangs/delete-many-khach-hangs', body).subscribe(res => {
                            this.selectionIds = [];
                            this.showMessage('success', 'Th??nh c??ng', 'X??a th??nh c??ng');
                            this.loadItemGrids(this.currentGrid);
                        });
                    }
                }
            });
    }

    changeStudentHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.changeStudentSelectedHandler();
    }

    changeStudentSelectedHandler(){
        this.dialogService.open(AlertDialogComponent, {
            context: {
                title: 'X??c nh???n chuy???n th??nh h???c vi??n',
                message: 'B???n c?? ch???c ch???n mu???n chuy???n kh??ch h??ng ???? ch???n th??nh h???c vi??n?',
            },
        }).onClose
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res) {
                    if (this.selectionIds.length > 0) {
                        const body = [...new Set(this.selectionIds)]
                        this.apiService.post('/khach-hangs/chuyen-hoc-vien-many-khach-hangs', body).subscribe(res => {
                            this.selectionIds = [];
                            this.showMessage('success', 'Th??nh c??ng', 'Chuy???n th??nh c??ng');
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
            kichBan: 0
        };

        this.loadItemGrids(this.currentGrid);
    }

    importHandler() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Import d??? li???u kh??ch h??ng',
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
        alert("Ch???c n??ng ??ang ???????c c???p nh???t !");
    }

    // statusHandler(dataItem: IKhachHang, status?: EKhachHang) {
    //     if (status) {
    //         let _content = TrangThaiChamSoc1Component;
    //         let _title = "";
    //         switch (status) {
    //             case EKhachHang.Status01:
    //                 _content = TrangThaiChamSoc1Component;
    //                 _title = 'Chuy???n tr???ng th??i - ????ng k??';
    //                 break;
    //             case EKhachHang.Status02:
    //                 _content = TrangThaiChamSoc2Component;
    //                 _title = 'Chuy???n tr???ng th??i - Li??n h???';
    //                 break;
    //             case EKhachHang.Status03:
    //                 _content = TrangThaiChamSoc3Component;
    //                 _title = 'Chuy???n tr???ng th??i - Ho??n t???t';
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
    //         alert("Tr???ng th??i kh??ng t???n t???i !");
    //     }

    // }

    selectTab(kichBan) {
        switch (kichBan.tabTitle) {
            case EKichBanKH.KichBan1:
                this.modelSearch.kichBan = EKichBanCSKH.KichBan1;
                this.currentGrid = this.gridViewKB1$;
                this.loadItemGrids(this.gridViewKB1$);
                break;
            case EKichBanKH.KichBan2:
                this.modelSearch.kichBan = EKichBanCSKH.KichBan2;
                this.currentGrid = this.gridViewKB2$;
                this.loadItemGrids(this.gridViewKB2$);
                break;
            case EKichBanKH.KichBan3:
                this.modelSearch.kichBan = EKichBanCSKH.KichBan3;
                this.currentGrid = this.gridViewKB3$;
                this.loadItemGrids(this.gridViewKB3$);
                break;
            case EKichBanKH.KichBan4:
                this.modelSearch.kichBan = EKichBanCSKH.KichBan4;
                this.currentGrid = this.gridViewKB4$;
                this.loadItemGrids(this.gridViewKB4$);
                break;

            default:
                this.modelSearch.kichBan = 0;
                this.currentGrid = this.gridView$;
                this.loadItemGrids(this.gridView$);
                break;
        }
    }

    completeCSKH(isOpenPopup){
        this.opened = isOpenPopup;
    }
}
