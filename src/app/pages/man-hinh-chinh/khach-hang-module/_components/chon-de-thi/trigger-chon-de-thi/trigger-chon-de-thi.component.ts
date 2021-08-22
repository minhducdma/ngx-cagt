import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { IDeThi } from '../../../../kho-de-module/model/tao-de-thi.model';
import { ChonDeThiComponent } from '../chon-de-thi.component';

@Component({
    selector: 'app-trigger-chon-de-thi',
    templateUrl: './trigger-chon-de-thi.component.html',
})
export class TriggerChonDeThiComponent implements OnInit {
    @Input() tenDeThi: string = '';
    @Output() dataDeThi =  new EventEmitter<any>();
    value: string = '';
    opened: boolean = false;
    constructor(
        protected windowService: WindowService
    ) { }

    ngOnInit() {
    }

    chonDeThi() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Chọn đề thi",
            content: ChonDeThiComponent,
            width: 1000,
            top: 100,
            autoFocusedElement: 'body',
        });
        windowRef.result.subscribe((result:IDeThi) => {
            this.opened = false;
            if(result){
                this.dataDeThi.emit(result);
                this.value = result.tenDeThi;
            }
        });
    }

}
