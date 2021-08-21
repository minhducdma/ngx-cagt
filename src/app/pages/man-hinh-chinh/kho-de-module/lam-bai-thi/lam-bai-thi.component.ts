import { ICauHoi, IBoDemGio } from './../model/tao-de-thi.model';
import { Component, Injector, OnInit, SimpleChanges } from '@angular/core';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { ApiService } from "../../../../@core/services/api.service";
import { ContainsFilterOperatorComponent, GreaterOrEqualToFilterOperatorComponent } from '@progress/kendo-angular-grid';
import '../../../../shared/controls/ckeditor-config/ckeditor.loader';
import 'ckeditor';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';
import { HtmlParser } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-lam-bai-thi',
  templateUrl: './lam-bai-thi.component.html',
  styleUrls: ['./lam-bai-thi.component.scss']
})
export class LamBaiThiComponent implements OnInit {

  constructor(injector: Injector,private route: ActivatedRoute) {
    this.apiService = injector.get(ApiService)
  }
  ckConfig = config.basicOption;
  currentRoot = 1;
  maxRoot = 0;
  currentCauHoi: ICauHoi = {
    id: 0,
    parentId: 0,
    codeCauHoi: "",
    tenCauHoi: "",
    noiDungCauHoi: "",
    chiaSeUsers: "",
    loaiCauHoi: "",
    trangThaiCauHoi: "",
    tongSoDiem: 0,
    tongThoiGian: 0,
    metadata: "",
    dapAns: [],
    items: [],
    root: 0,
    level: 0,
    orderDetail: "",
    randomGUID: 0,
    cauTraLoi: "",
    dapAnChonSingle: 0
  };
  currentDapAnFlag: string;
  deThiData: ICauHoi[] = [];
  cauHoiTreeRoot: ICauHoi[] = [];
  cauHoiTreeLeaf: ICauHoi[] = [];
  giaoDienCauHois: ICauHoi[];
  apiService: ApiService;
  lichSuTraLoi: any;
  cauTraLoi: [];
  safeHtml: "";
  url: string = UrlConstant.ROUTE.LOAD_DE_THI;
  boDemGio : IBoDemGio[] = [];

ngOnChanges(changes: SimpleChanges): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  var deThiId = this.route.snapshot.params.deThiId;
    var userDetail = this.route.snapshot.params.userDetail;
    console.log(this.boDemGio);
    this.loadDeThi(deThiId);

}

  ngOnInit() {
    var deThiId = this.route.snapshot.params.deThiId;
    var userDetail = this.route.snapshot.params.userDetail;
    console.log(this.boDemGio);
    this.loadDeThi(deThiId);


  }
  loadDeThi(deThiId){
    this.apiService.post(this.url, deThiId).subscribe((res: any) => {
      // show notification
      this.deThiData = res as ICauHoi[];
      this.maxRoot = Math.max.apply(Math, this.deThiData.map(function(o) { return o.root; }))
      this.cauHoiTreeRoot = this.deThiData.filter(e => e.level == 1);
      this.cauHoiTreeRoot.forEach(element => {
        this.boDemGio.push({
          ten: element.tenCauHoi,
          thoiGian: element.tongThoiGian
        })
      });

      // console.log(this.deThiData);

      this.getAllLeaf(this.currentRoot);

      // this.notification.show('Success', 'Tạo mới thành công', { status: 'success' });
      // close form
    });
  }

  completed() {
  }

  getAllRoot() {

    // console.log(this.cauHoiTreeRoot)


  }
  getAllLeaf(idRoot) {
    var lsCauHoiInRoot = this.deThiData.filter(r => r.root == idRoot);
    this.cauHoiTreeLeaf = [];
    for (let i = 0; i < lsCauHoiInRoot.length; i++) {
      if (lsCauHoiInRoot.filter(r => r.orderDetail.includes(lsCauHoiInRoot[i].orderDetail) == true).length == 1)
        this.cauHoiTreeLeaf.push(lsCauHoiInRoot[i]);
    }
    this.cauHoiTreeLeaf = this.cauHoiTreeLeaf.sort((a, b) => a.id - b.id);
    this.setterCurrentCauHoi(0);

  }
  setterCurrentCauHoi(index) {
    this.currentCauHoi = this.cauHoiTreeLeaf[index];
    this.buildGiaoDienCauHoi(this.currentCauHoi.id);
    this.setterDapAnFlag();

  }
  setterDapAnFlag() {
    if (this.currentCauHoi.dapAns.length <= 0)
      this.currentDapAnFlag = "ckeditor";
    if (this.currentCauHoi.dapAns.length > 0)
      if (this.currentCauHoi.dapAns.filter(r => r.isDapAnDung == true).length > 1)
        this.currentDapAnFlag = "checkbox";
    if (this.currentCauHoi.dapAns.filter(r => r.isDapAnDung == true).length == 1)
      this.currentDapAnFlag = "radio";
  }
  choosenCurrentCauHoi(id) {
    // console.log(id);
    let daTraLoi = this.cauHoiTreeLeaf.find(r => r.id == this.currentCauHoi.id);
    daTraLoi = this.currentCauHoi;

    this.setterCurrentCauHoi(this.cauHoiTreeLeaf.indexOf(this.cauHoiTreeLeaf.find(r => r.id == id)));
  }

  buildGiaoDienCauHoi(cauHoiId) {
    let cauHoiAffected = this.deThiData.find(r => r.id == cauHoiId);
    let orderList = cauHoiAffected.orderDetail.split("_");
    this.giaoDienCauHois = this.deThiData.filter(r => r.root == cauHoiAffected.root);

    this.giaoDienCauHois = this.giaoDienCauHois.filter(r => r.id != this.currentCauHoi.id && orderList.indexOf(r.id.toString()) >= 0);
    // console.log(this.giaoDienCauHois);
    this.giaoDienCauHois = this.giaoDienCauHois.sort((a, b) => a.level - b.level);
    // for (var i = 0; i < this.giaoDienCauHois.length; i++) {
    //   if (i > 0)
    //     this.giaoDienCauHois[i].noiDungCauHoi = "<p style='display:inline'>"+this.buildSpaceGiaoDienCauHoi(this.giaoDienCauHois[i].level)+"</p>" + this.giaoDienCauHois[i].noiDungCauHoi
    // }
  }
  buildSpaceGiaoDienCauHoi(level) {
    if (level > 1) {
      let htm = "";
      for (let i = 1; i < level; i++) {
        htm += "____"
      }
      return htm;
    }


  }
  nextRoot(){
    if(this.currentRoot<this.maxRoot){
      this.currentRoot++;
      this.getAllLeaf(this.currentRoot);
    }

  }
  previewRoot(){
    if(this.currentRoot > 1){
      this.currentRoot--;
      this.getAllLeaf(this.currentRoot);
    }
  }
  showNextButton(){
    if(this.currentRoot == this.maxRoot)
      return false
    return true;
  }
  showPrevButton(){
    if(this.currentRoot == 1)
      return false
    return true;
  }
  submitBaiThi() {
    console.log(this.deThiData);
  }


}
