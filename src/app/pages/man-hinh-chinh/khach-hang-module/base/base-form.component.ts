import { OnInit, OnDestroy, Input, Directive, Injector } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { WindowRef } from "@progress/kendo-angular-dialog";
import { ActionEnum } from "../../../../@core/constants/enum.constant";
import { DropDownListEnum } from "../../../../shared/controls/cagt-select/cagt.data";
import { ApiService } from "../../../../@core/services/api.service";

export interface IGenerice {
    id?: number;
    idNhanSu?: number;
    idFileDinhKem?: number;
    tenFile?: string;
    type?: number;
    size?: number;
    path?: string;
    forWeb?: boolean;
    checkSum?: string;
    guidId?: string;
    idsFileDinhKem?: any[];

}
@Directive()
export abstract class BaseFormComponent<T extends IGenerice> implements OnInit, OnDestroy {
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


    constructor(
        injector : Injector
    ) {
        this.windowRef = injector.get(WindowRef)
        this.formBuilder = injector.get(FormBuilder)
        this.apiService = injector.get(ApiService)
    }

    ngOnInit(): void {
        this.createForm();
        if (!this.action) {
            this.action = this.model && this.model.id ? ActionEnum.UPDATE : ActionEnum.CREATE;
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
}
