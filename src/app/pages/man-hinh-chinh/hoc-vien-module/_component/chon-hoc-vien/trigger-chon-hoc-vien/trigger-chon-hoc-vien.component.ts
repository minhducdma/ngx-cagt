import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowService } from '@progress/kendo-angular-dialog';
import { IKhachHang } from '../../../../khach-hang-module/model/khach-hang.model';
import { IHocVien } from '../../../model/hoc-vien-model';
import { ChonHocVienComponent } from '../chon-hoc-vien.component';

@Component({
	selector: 'app-trigger-chon-hoc-vien',
	templateUrl: './trigger-chon-hoc-vien.component.html',
	styleUrls: ['./trigger-chon-hoc-vien.component.scss']
})
export class TriggerChonHocVienComponent implements OnInit {
    @Input() tenHocVien: string = '';
    @Output() dataOut =  new EventEmitter<any>();
	value: string = '';
    opened: boolean = false;
    constructor(
        protected windowService: WindowService
    ) { }

	ngOnInit() {
	}
	chonHocVien() {
		this.opened = true;
        const windowRef = this.windowService.open({
            title: "Chọn đề thi",
            content: ChonHocVienComponent,
            width: 1000,
            top: 100,
            autoFocusedElement: 'body',
        });
        windowRef.result.subscribe((result:IHocVien) => {
            this.opened = false;
            if(result){
                this.dataOut.emit(result);
                this.value = result.khachHang.hoTen;
            }
        });
	 }
}
