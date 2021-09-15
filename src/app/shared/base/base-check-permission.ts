import { Directive, Injector, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { IUser } from "../models/user.model";

@Directive()
export abstract class BaseCheckPermissionComponent implements OnInit, OnDestroy {
    protected destroyed$ = new Subject();
    currentUser: IUser = null; 

    constructor(
        injector: Injector
    ){}

    ngOnInit(){
        this.getCurrentUser();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    getCurrentUser(){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as IUser
    }
}