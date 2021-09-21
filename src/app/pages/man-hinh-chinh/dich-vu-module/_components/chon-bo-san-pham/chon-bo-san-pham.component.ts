import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowService } from '@progress/kendo-angular-dialog';
import { IBoSanPham } from '../../model/bo-san-pham.model';
import { SelectBoSanPhamComponent } from './select-bo-san-pham/select-bo-san-pham.component';

@Component({
    selector: 'app-chon-bo-san-pham',
    templateUrl: './chon-bo-san-pham.component.html',
    styleUrls: ['./chon-bo-san-pham.component.scss']
})
export class ChonBoSanPhamComponent implements OnInit {
    @Input() dataIn: string;
    @Output() dataOut = new EventEmitter<any>();
    value: string = '';
    opened: boolean = false;

    constructor(
        protected windowService: WindowService
    ) { }

    ngOnInit() {
        if(this.dataIn != null)
            this.value = this.dataIn;
    }
    chonBoSanPham() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Chọn bộ sản phẩm",
            content: SelectBoSanPhamComponent,
            width: 1100,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.isChild = true;
        windowRef.result.subscribe((result: IBoSanPham) => {
            this.opened = false;
            if (result) {
                this.dataOut.emit(result);
                this.value = result.ten
            }
        });
    }

}
