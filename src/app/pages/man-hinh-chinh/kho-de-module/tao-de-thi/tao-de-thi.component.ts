import { IDeThi } from './../model/tao-de-thi.model';
import { Component, Injector, OnInit } from '@angular/core';
import { ICauHoi, IDapAn } from '../model/tao-de-thi.model';
import '../../../../shared/controls/ckeditor-config/ckeditor.loader';
import 'ckeditor';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseFormComponent } from '../../khach-hang-module/base/base-form.component';
import {ApiService} from "../../../../@core/services/api.service";
@Component({
  selector: 'ngx-tao-de-thi',
  templateUrl: './tao-de-thi.component.html',
  styleUrls: ['./tao-de-thi.component.scss']
})
export class TaoDeThiComponent  implements OnInit {

  url: string = UrlConstant.ROUTE.CREATE_DE_THI;
  private apiService : ApiService;
  public expandedKeys: number[] = [1];
  public dataCauHoi: ICauHoi[] = [];
  public dataDeThi: IDeThi;
  selectedCauHoi: ICauHoi;
  tenCauHoi: string = "";
  ckConfig = config.basicOption;
  constructor(
    injector: Injector
  ) {
    this.apiService = injector.get(ApiService)
  }

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
      id: 0,
      parentId: 0,
      codeCauHoi: "",
      tenCauHoi: this.tenCauHoi,
      noiDungCauHoi: "",
      chiaSeUsers: "all",
      loaiCauHoi: "",
      trangThaiCauHoi: "",
      tongSoDiem: 0,
      tongThoiGian: 0,
      metadata: "",
      dapAns: [],
      items: []
    } as ICauHoi;
    this.dataCauHoi.push(cauhoi);
  }
  selectCauHoi(data) {
    console.log(data);
  }

  removeCauHoi(dataItem: ICauHoi[], item: ICauHoi) {
    dataItem.map(i => {
      const index = dataItem.indexOf(item, 0);
      if (index > -1) {
        dataItem.splice(index, 1);
      }
      else if (i.items != null && i.items.length > 0)
        this.removeCauHoi(i.items, item)
    })
  }

  saveListCauHoi() {
    this.dataDeThi = {
      tenDeThi: "De Mock Test 2",
      loaiDeThi: "Trac nghiem",
      trangThaiDeThi: "Ok",
      id: 0
    }
    let obj = {
      deThi: this.dataDeThi,
      cauHois: this.dataCauHoi
    };

    this.apiService
      .post(this.url, obj)
      .subscribe(res => {
        // show notification
        alert("Thanh cong. Check du lieu xem nao")
        // this.notification.show('Success', 'Tạo mới thành công', { status: 'success' });
        // close form
      });
  }

  showCauHoi(item) {
    this.selectedCauHoi = item as ICauHoi;
  }

  addCauTraLoi(item: ICauHoi) {
    let dapAn = {
      cauHoiId: item.id,
      noiDungCauHoi: "",
      isDapAnDung: false,
      id: 0
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
}
