import { Component, OnInit } from '@angular/core';
import { ICauHoi } from '../model/tao-de-thi.model';

@Component({
    selector: 'ngx-tao-de-thi',
    templateUrl: './tao-de-thi.component.html',
    styleUrls: ['./tao-de-thi.component.scss']
})
export class TaoDeThiComponent implements OnInit {
    public expandedKeys: number[] = [1];
    public dataCauHoi: ICauHoi[] = [];
    tenCauHoi: string = "";

    constructor() { }

    ngOnInit() {
    }
    addCauHoi() {
        let cauhoi = {
            id: Math.random(),
            parentId: 0,
            codeCauHoi: null,
            tenCauHoi: this.tenCauHoi,
            noiDungCauHoi: null,
            chiaSeUsers: null,
            loaiCauHoi: null,
            trangThaiCauHoi: null,
            tongSoDiem: null,
            tongThoiGian: null,
            metadata: null,
            dapAns: []
        } as ICauHoi;
        this.dataCauHoi.push(cauhoi);
    }
    selectCauHoi(data) {
        console.log(data);
    }

    removeCauHoi(item) {
        const index = this.dataCauHoi.indexOf(item, 0);
        if (index > -1) {
            this.dataCauHoi.splice(index, 1);
        }
    }

    saveListCauHoi(){
        console.log(this.dataCauHoi);
    }

    testValue:string;
    showCauHoi(item){
        debugger;
        console.log(item);
        this.testValue = item.tenCauHoi;
    }
}
//test commit quan