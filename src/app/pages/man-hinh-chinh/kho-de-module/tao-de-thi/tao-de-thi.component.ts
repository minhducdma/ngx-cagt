import { Component, OnInit } from '@angular/core';
import { ICauHoi, IDapAn } from '../model/tao-de-thi.model';
import '../../../../shared/controls/ckeditor-config/ckeditor.loader';
import 'ckeditor';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';
@Component({
    selector: 'ngx-tao-de-thi',
    templateUrl: './tao-de-thi.component.html',
    styleUrls: ['./tao-de-thi.component.scss']
})
export class TaoDeThiComponent implements OnInit {
    public expandedKeys: number[] = [1];
    public dataCauHoi: ICauHoi[] = [];
    selectedCauHoi: ICauHoi;
    tenCauHoi: string = "";
    ckConfig = config.basicOption;
    constructor() { }

    ngOnInit() {
        this.firstLoad();
    }

    firstLoad() {
        this.addCauHoi();
        this.showCauHoi(this.dataCauHoi[0]);
        this.addCauTraLoi(this.dataCauHoi[0]);
    }

    addCauHoi() {
        let cauhoi = {
            id: Math.random(),
            parentId: null,
            codeCauHoi: null,
            tenCauHoi: this.tenCauHoi,
            noiDungCauHoi: null,
            chiaSeUsers: null,
            loaiCauHoi: null,
            trangThaiCauHoi: null,
            tongSoDiem: null,
            tongThoiGian: null,
            metadata: null,
            dapAns: [],
            items: null
        } as ICauHoi;
        this.dataCauHoi.push(cauhoi);
    }
    selectCauHoi(data) {
        console.log(data);
    }

    removeCauHoi(dataItem : ICauHoi[], item:ICauHoi) {
        dataItem.map(i => {
            const index = dataItem.indexOf(item, 0);
            if (index > -1) {
                dataItem.splice(index, 1);
            }
            else if(i.items != null && i.items.length > 0)
                this.removeCauHoi(i.items, item)
        })
    }

    saveListCauHoi() {
        console.log(this.dataCauHoi);
    }

    showCauHoi(item) {
        this.selectedCauHoi = item as ICauHoi;
    }

    addCauTraLoi(item: ICauHoi) {
        let dapAn = {
            cauHoiId: item.id,
            noiDungCauHoi: null,
            isDapAnDung: null,
            creationTime: null,
            creatorId: null,
            id: Math.random()
        } as IDapAn;
        this.selectedCauHoi.dapAns.push(dapAn);
        console.log(this.selectedCauHoi);
    }
    removeCauTraLoi(item: IDapAn) {
        const index = this.selectedCauHoi.dapAns.indexOf(item, 0);
        if (index > -1) {
            this.selectedCauHoi.dapAns.splice(index, 1);
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }
}