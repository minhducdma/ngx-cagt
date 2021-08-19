import { ICauHoi } from './../model/tao-de-thi.model';
import { Component, Injector, OnInit } from '@angular/core';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import {ApiService} from "../../../../@core/services/api.service";
import { GreaterOrEqualToFilterOperatorComponent } from '@progress/kendo-angular-grid';
import 'ckeditor';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';

@Component({
    selector: 'ngx-lam-bai-thi',
    templateUrl: './lam-bai-thi.component.html',
    styleUrls: ['./lam-bai-thi.component.scss']
})
export class LamBaiThiComponent implements OnInit {

    constructor(injector: Injector) {
      this.apiService = injector.get(ApiService)
    }
    ckConfig = config.basicOption;
    currentRoot = 1;
    currentCauHoi : ICauHoi;
    deThiData: ICauHoi[] = [];
    cauHoiTreeRoot : ICauHoi[] = [];
    cauHoiTreeLeaf : ICauHoi[] = [];
    giaoDienCauHois: ICauHoi[];
    apiService : ApiService;
    lichSuTraLoi: any;
    cauTraLoi: [];
    safeHtml: "";
    url: string = UrlConstant.ROUTE.LOAD_DE_THI;

    ngOnInit() {

      this.loadDeThi();

    }

    completed() {
    }

    loadDeThi(id:number   =  1){
      this.apiService.post(this.url,1).subscribe((res :  any) => {
        // show notification
        this.deThiData  =  res as ICauHoi[];
        this.getAllLeaf(this.currentRoot);
        this.buildGiaoDienCauHoi(this.currentCauHoi.id);
        // this.notification.show('Success', 'Tạo mới thành công', { status: 'success' });
        // close form
      });


    }
    getAllRoot(){
      this.cauHoiTreeRoot = this.deThiData.filter(e => e.level == 0);
    }
    getAllLeaf(idRoot){
      var lsCauHoiInRoot = this.deThiData.filter(r => r.root == idRoot);
      console.log(lsCauHoiInRoot);
      for(let i = 0; i < lsCauHoiInRoot.length; i++){
        if(lsCauHoiInRoot.filter(r => r.orderDetail.includes(lsCauHoiInRoot[i].orderDetail) == true).length == 1)
          this.cauHoiTreeLeaf.push(lsCauHoiInRoot[i]);
      }
      this.currentCauHoi = this.cauHoiTreeLeaf[0];
      console.log(this.currentCauHoi);

    }
    buildGiaoDienCauHoi(cauHoiId){
      let cauHoiAffected = this.deThiData.find(r => r.id == cauHoiId);
      this.giaoDienCauHois = this.deThiData.filter(r => r.root == cauHoiAffected.root);
      this.giaoDienCauHois = this.giaoDienCauHois.filter(r => r.id != this.currentCauHoi.id);
      this.giaoDienCauHois = this.giaoDienCauHois.sort((a,b) => a.level - b.level);

    }

}
