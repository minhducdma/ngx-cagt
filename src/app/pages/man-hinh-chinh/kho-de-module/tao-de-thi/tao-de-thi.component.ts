import { IDeThi } from './../model/tao-de-thi.model';
import { Component, Injector, OnInit } from '@angular/core';
import { ICauHoi, IDapAn } from '../model/tao-de-thi.model';
import 'ckeditor';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { BaseFormComponent } from '../../khach-hang-module/base/base-form.component';
import { ApiService } from "../../../../@core/services/api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListEnum } from '../../../../shared/controls/cagt-select/cagt.data';
import { FormUtil } from '../../../../shared/utils/form';
import { NbToastrModule, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-tao-de-thi',
  templateUrl: './tao-de-thi.component.html',
  styleUrls: ['./tao-de-thi.component.scss']
})
export class TaoDeThiComponent implements OnInit {
  url: string = UrlConstant.ROUTE.CREATE_DE_THI;
  getDeThiUrl = UrlConstant.ROUTE.GET_UPDATE_DE_THI;
  private apiService: ApiService;
  protected formBuilder: FormBuilder;
  protected notification: NbToastrService;

  public expandedKeys: number[] = [1];
  public dataCauHoi: ICauHoi[] = [];
  public dataDeThi: IDeThi;
  dropdownListEnum = DropDownListEnum;
  form: FormGroup;
  selectedCauHoi: ICauHoi;
  tenCauHoi: string = "";
  ckConfig = config.basicOption;
  ckConfig2 = config.other1Option;
  protected http: HttpClient
  deThiId : number;

  constructor(
    injector: Injector,private route: ActivatedRoute
  ) {
    this.apiService = injector.get(ApiService);
    this.formBuilder = injector.get(FormBuilder);
    this.notification = injector.get(NbToastrService);

    this.http = injector.get(HttpClient)
  }

  ngOnInit() {
    this.deThiId = this.route.snapshot.params.deThiId;
    if(this.deThiId > 0){
      this.apiService.post(this.getDeThiUrl + '/' + this.deThiId,this.deThiId).subscribe((res) => {
        console.log(res);
        this.dataCauHoi = JSON.parse(JSON.stringify(res));

      })
    }

    this.firstLoad();
  }

  firstLoad() {
    this.createForm();
    this.addCauHoi();
    this.showCauHoi(this.dataCauHoi[0]);
    this.addCauTraLoi(this.dataCauHoi[0]);
  }
  fileChangeEvent(e: File[], cauHoi, dapAn) {
    this.postFile(e[0], cauHoi, dapAn);
  }
  postFile(fileToUpload: File, cauHoi: ICauHoi, dapAn: number) {

    const formData: FormData = new FormData();
    formData.append('files', fileToUpload);
    const endpoint = UrlConstant.UPLOAD_BASE_URL;
    let headers = new Headers();

    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    //let options = new RequestOptions({ headers: headers });
    this.apiService.upload(endpoint, formData)
      .subscribe(res => {
        var response = JSON.parse(JSON.stringify(res));

        let fileExt = response.fileName.split('.')[1];
        if (fileExt == 'jpg' || fileExt == 'png') {
          if (cauHoi && !dapAn) {
            this.selectedCauHoi.noiDungCauHoi = this.selectedCauHoi.noiDungCauHoi + '<img src=' + response.url + ' style="width: 100px"/>';
          }
          if (cauHoi && dapAn >= 0) {
            let r = this.selectedCauHoi.dapAns[dapAn];
            this.selectedCauHoi.dapAns[dapAn].noiDungCauHoi = this.selectedCauHoi.dapAns[dapAn].noiDungCauHoi + '<img src=' + response.url + ' style="width: 100px"/>';
          }
        }
        if (fileExt == 'mp3') {
          if (cauHoi && !dapAn) {
            let html = '';
            html += '<audio controls controls="controls" controlslist="nodownload" src="'+response.url+'">';
            html += '<source src="' + response.url + '" type="audio/mpeg">';
            html += '</audio>';
            console.log(html);
            //<audio controls>
            this.selectedCauHoi.noiDungCauHoi = this.selectedCauHoi.noiDungCauHoi + html;
          }
          if (cauHoi && dapAn >= 0) {
            let html = '';
            html += '<audio controls controls="controls" controlslist="nodownload" src="'+response.url+'">';
            html += '<source src="' + response.url + '" type="audio/mpeg">';
            html += '</audio>';
            console.log(html);
            this.selectedCauHoi.dapAns[dapAn].noiDungCauHoi = this.selectedCauHoi.dapAns[dapAn].noiDungCauHoi + html;
          }
        }

      })
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

  createForm() {
    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      tenDeThi: [null, Validators.required],
      loaiDeThi: [null, Validators.required],
      tongThoiGian: [null, Validators.required],
      tongSoDiem: [null, Validators.required],
      trangThaiDeThi: [null, Validators.required],
    });
  }

  saveListCauHoi() {
    if (this.form.invalid) {
      // trigger validate all field
      FormUtil.validateAllFormFields(this.form);
      this.notification.show('Nhập đầy đủ các trường dữ liệu bắt buộc', 'Cảnh báo', { status: 'warning' });
      return;
    }
    let obj = {
      deThi: this.form.value,
      cauHois: this.dataCauHoi
    };

    // console.log(obj);
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
