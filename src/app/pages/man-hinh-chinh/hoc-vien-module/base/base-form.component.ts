import { OnInit, OnDestroy, Input, Directive, Injector } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { WindowRef } from "@progress/kendo-angular-dialog";
import { ActionEnum } from "../../../../@core/constants/enum.constant";
import { DropDownListEnum } from "../../../../shared/controls/cagt-select/cagt.data";
import { ApiService } from "../../../../@core/services/api.service";
import { NbToastrService } from "@nebular/theme";
import { DatePipe } from "@angular/common";
import { BaseCheckPermissionComponent } from "../../../../shared/base/base-check-permission";

@Directive()
export abstract class BaseFormComponent<T> extends BaseCheckPermissionComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;

    form: FormGroup;

    dropdownListEnum = DropDownListEnum;

    //fileInput: IFileAttach[] = [];

    protected destroyed$ = new Subject();

    //protected windowRef: NbWindowRef;
    protected windowRef: WindowRef;
    protected formBuilder: FormBuilder;
    protected apiService: ApiService;
    protected notification: NbToastrService;
    protected datepipe: DatePipe;


    constructor(
        injector: Injector
    ) {
        super(injector)
        this.windowRef = injector.get(WindowRef)
        this.formBuilder = injector.get(FormBuilder)
        this.apiService = injector.get(ApiService)
        this.notification = injector.get(NbToastrService)
        this.datepipe = injector.get(DatePipe)
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.createForm();
        if (!this.action) {
            this.action = this.model ? ActionEnum.UPDATE : ActionEnum.CREATE;
        }

    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeForm() {
        this.windowRef.close();
    }

    setFormValue(data) {
        this.form.patchValue(data);
    }

    abstract onSubmit();

    abstract createForm();

    formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    convertCorrectDateTime(date: Date){
        date.setTime(date.getTime() + (7*60*60*1000)) //Convert to VN datetime
        return new Date(date);
    }

    isFailValidateRangeDate(fromDate: Date, toDate: Date ){
        if(fromDate > toDate){
            this.notification.show('Th???i gian b???t ?????u kh??ng ???????c l???n h??n th???i gian k???t th??c', 'C???nh b??o', { status: 'warning' });
            return true;
        }
        return false;
    }
}
