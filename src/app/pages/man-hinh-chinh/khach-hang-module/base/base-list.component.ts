import { Directive, HostListener, Injector, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { NbDialogService, NbToastrService, NbWindowControlButtonsConfig, NbWindowService } from "@nebular/theme";
import { WindowService } from "@progress/kendo-angular-dialog";
import { PagerSettings } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { TooltipDirective } from "@swimlane/ngx-charts";
import { Subject } from "rxjs";
import { ReziseTable } from "../../../../@core/constants/app.constant";
import { ActionEnum } from "../../../../@core/constants/enum.constant";
import { ApiService } from "../../../../@core/services/api.service";
import { DropDownListEnum } from "../../../../shared/controls/cagt-select/cagt.data";
import { EKhachHang } from "./base.enum";

@Directive()
export abstract class BaseListComponent<T> implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    destroy$ = new Subject<void>();
    isLoading = false;
    opened = false;
    dropdownListEnum = DropDownListEnum;
    khachHangEnum = EKhachHang;
    gridView$ = {
        data: [],
        total: 0
    };
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    buttonsConfig: NbWindowControlButtonsConfig = {
        minimize: false,
        maximize: false,
        fullScreen: true,
    };

    nhanSuId: number;
    tabName: string;
    openFirstTime = false;
    searchAdvance = false;
    //dropdownListEnum = DropDownListEnum;
    pageConfig: PagerSettings | boolean = false;
    loading = false;
    selectionIds: number[] = [];

    protected action: ActionEnum;
    protected model: T;
    protected destroyed$ = new Subject();
    searchControl = new FormControl();


    pageHeight = window.innerHeight - ReziseTable + 30;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 30;
    }

    protected windowService: WindowService;
    protected apiService: ApiService;
    protected formBuilder: FormBuilder;
    protected notification: NbToastrService;
    protected dialogService: NbDialogService;
    constructor(
        injector: Injector
    ) {
        this.windowService = injector.get(WindowService)
        this.apiService = injector.get(ApiService)
        this.formBuilder = injector.get(FormBuilder)
        this.notification = injector.get(NbToastrService)
        this.dialogService = injector.get(NbDialogService)
    }

    ngOnInit(): void {
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    // showModalViewFile(guidId, name) {
    //     this.opened = true;
    //     const windowRef = this.windowService.open({
    //         title: 'Xem tập tin Đính kèm',
    //         content: ViewFileComponent,
    //         width: 1200,
    //         height: 800,
    //         top: 10,
    //         autoFocusedElement: 'body',
    //         state: 'maximized',
    //     });

    //     const param = windowRef.content.instance;
    //     param.key = guidId;
    //     param.fileName = name;

    //     windowRef.result.subscribe(result => {
    //         if (result instanceof WindowCloseResult) {
    //             this.opened = false;
    //         }
    //     });
    // }

    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();

    }

    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCreateOrUpdate();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }
    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    openAdvanceSearch() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }
    searchHandler() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    protected abstract showFormCreateOrUpdate();

    protected abstract loadItems();

    protected get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            // sortCol: this.gridState.sort[0].field,
            // isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
        };
    }

    convertArrToStr(obj: any) {
        let result = '';
        if (typeof obj !== 'string') {
            if (obj.length > 0)
                result = obj.join(",");
        } else {
            result = obj;
        }
        return result;
    }

    showMessage(type:string, title: string, body: string) {
        const config = {
            status: type,
        };
        this.notification.show(
            body,
            title,
            config);
    }
}
