import { OnInit, OnDestroy, Input, Directive, Injector } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { ActionEnum } from "../../../../@core/constants/enum.constant";
import { NbWindowRef, NbWindowService } from '@nebular/theme';

@Directive()
export abstract class BaseKhachHangFormComponent<T> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;

    form: FormGroup;

    //dropdownListEnum = DropDownListEnum;

    //fileInput: IFileAttach[] = [];

    protected destroyed$ = new Subject();

    protected windowRef: NbWindowRef;
    constructor(
        injector : Injector
    ) {
        this.windowRef = injector.get(NbWindowRef)
    }

    ngOnInit(): void {
        this.createForm();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeForm() {
        this.windowRef.close();
    }

    protected abstract onSubmit();

    protected abstract createForm();
}
