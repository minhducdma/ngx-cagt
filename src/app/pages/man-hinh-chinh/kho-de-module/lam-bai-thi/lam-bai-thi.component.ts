import { ICauHoi, IBoDemGio, ILamBaiThi } from './../model/tao-de-thi.model';
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
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { type } from 'os';
import { isUndefinedOrEmptyString } from '@abp/ng.core';


@Component({
    selector: 'ngx-lam-bai-thi',
    templateUrl: './lam-bai-thi.component.html',
    styleUrls: ['./lam-bai-thi.component.scss']
})

export class LamBaiThiComponent implements OnInit {
  protected dialogService: NbDialogService;
  constructor(injector: Injector,private route: ActivatedRoute) {
    this.apiService = injector.get(ApiService)
    this.dialogService = injector.get(NbDialogService)

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
  destroy$ = new Subject<void>();

  lamBaiThis : ILamBaiThi[] = [];
  deThiId : number;
  userDetail : string;



  ngOnInit() {
    this.deThiId = this.route.snapshot.params.deThiId;
    this.userDetail = this.route.snapshot.params.userDetail;
    console.log(this.boDemGio);
    this.loadDeThi(this.deThiId);


  }
  loadDeThi(deThiId){
    this.apiService.post(this.url, deThiId).subscribe((res: any) => {
      // show notification
      this.deThiData = res as ICauHoi[];
      this.maxRoot = Math.max.apply(Math, this.deThiData.map(function(o) { return o.root; }))
      this.cauHoiTreeRoot = this.deThiData.filter(e => e.level == 1);
      this.getAllRoot();

      // this.boDemGio[1].isStart = true;


      // console.log(this.deThiData);

      this.getAllLeaf(this.currentRoot);

      // this.notification.show('Success', 'Tạo mới thành công', { status: 'success' });
      // close form
    });
  }

  completed() {
  }
  getAllRoot(){
    this.cauHoiTreeRoot.forEach((element, index) => {
      this.boDemGio.push({
        id: element.root,
        ten: element.tenCauHoi,
        thoiGian: element.tongThoiGian,
        isStart: index ==0 ? true : false
      })
    });
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
    if(typeof(this.currentCauHoi.cauTraLoi) === 'undefined')
      this.currentCauHoi.cauTraLoi = "";
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


    this.dialogService.open(AlertDialogComponent, {
      context: {
          title: 'Xác nhận chuyển root',
          message: 'Bạn có chắc chắn muốn chuyển?',
      },
      }).onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
          if (res) {
            if(this.currentRoot<this.maxRoot){
              if(this.lamBaiThis.filter(r => !this.cauHoiTreeLeaf.find(x => x.id == r.cauHoiId))) this.recordingRoot();
              this.currentRoot++;
              this.getAllLeaf(this.currentRoot);
              this.changeBoDemGio();
            }
          }
      });

  }
  previewRoot(){
    this.dialogService.open(AlertDialogComponent, {
      context: {
        title: 'Xác nhận chuyển root',
        message: 'Bạn có chắc chắn muốn chuyển?',
      },
      }).onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
          if (res) {
            if(this.currentRoot > 1){
              if(this.lamBaiThis.filter(r => !this.cauHoiTreeLeaf.find(x => x.id == r.cauHoiId))) this.recordingRoot();
              this.currentRoot--;
              this.getAllLeaf(this.currentRoot);
              this.changeBoDemGio();
            }
          }
      });

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

  checkLoggedRoot(){

  }
  recordingRoot(){

    let d = this.cauHoiTreeLeaf;
    d = d.filter(r => r.dapAnChonSingle != null || r.cauTraLoi || r.dapAns.length > 0);

    let records = [];
    let tuLuans = d.filter(r => typeof(r.cauTraLoi)!=='undefined');

    for(let i = 0; i < tuLuans.length; i++){
      records.push({
        userId: this.userDetail,
        userDetail: this.userDetail,
        deThiId: this.deThiId,
        cauHoiId: tuLuans[i].id,
        isDapAnDung: false,
        cauTraLoi : tuLuans[i].cauTraLoi,
        listDapAns: []
      })
    }


    let singleDapAns = d.filter(r => typeof(r.dapAnChonSingle)!== 'undefined');
    singleDapAns.forEach((e) => {
      e.dapAns.forEach((x) =>{
        x.dapAnChon = false;
        if(e.dapAnChonSingle == x.id)
          x.dapAnChon = true;
      })
    })
    singleDapAns.forEach(e => {
      records.push({
        userId: this.userDetail,
        userDetail: this.userDetail,
        deThiId: this.deThiId,
        cauHoiId: e.id,
        isDapAnDung: false,
        cauTraLoi : "",
        listDapAns: [e.id],
      })
    })

    let multipleDapAns = d.filter(r => typeof(r.cauTraLoi)==='undefined')
    multipleDapAns = multipleDapAns.filter(r => typeof(r.dapAnChonSingle)=== 'undefined')

    multipleDapAns.forEach(e => {
      let record = [];
      let dapAns = e.dapAns;
      dapAns.forEach(r => {
        if(typeof(r.dapAnChon) != 'undefined')
          record.push(r.id);
      })
      records.push({
        userId: this.userDetail,
        userDetail: this.userDetail,
        deThiId: this.deThiId,
        cauHoiId: e.id,
        isDapAnDung: false,
        cauTraLoi : "",
        listDapAns: record,
      })
    })

    if(this.lamBaiThis.length <= 0){
      // console.log(records);
      records.forEach(r  => {
        this.lamBaiThis.push(r);
      })

    }
    else{
      records.forEach(element => {
        let aff = this.lamBaiThis.find(x => x.cauHoiId == element.cauHoiId);
        console.log(aff);
        if(aff){
          this.lamBaiThis.splice(this.lamBaiThis.indexOf(aff), 1);
          this.lamBaiThis.push(element);
        }

        if(!aff){
          this.lamBaiThis.push(element);
        }
      })
    }

    console.log(this.lamBaiThis);


  }


  getAllLeaf_Ketqua(idRoot) {
    var lsCauHoiInRoot = this.deThiData.filter(r => r.root == idRoot || idRoot == 0);
    this.cauHoiTreeLeaf = [];
    for (let i = 0; i < lsCauHoiInRoot.length; i++) {
      if (lsCauHoiInRoot.filter(r => r.orderDetail.includes(lsCauHoiInRoot[i].orderDetail) == true).length == 1)
        this.cauHoiTreeLeaf.push(lsCauHoiInRoot[i]);
    }
    this.cauHoiTreeLeaf = this.cauHoiTreeLeaf.sort((a, b) => a.id - b.id);

  }


  changeBoDemGio(){
    console.log(this.boDemGio);
    for(let i = 0; i < this.boDemGio.length; i++)
      this.boDemGio[i].isStart = false;

      this.boDemGio.find(r => r.id  == this.currentRoot).isStart = true;

    // this.boDemGio.find(r => r.id == rootId).isStart = true;
  }




}
