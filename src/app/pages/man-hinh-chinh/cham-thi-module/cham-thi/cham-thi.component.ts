import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config } from '../../../../shared/controls/ckeditor-config/ckeditor.config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../@core/constants/url.constant';
import { ApiService } from '../../../../@core/services/api.service';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { BaseListComponent } from '../base/base-list.component';
import { IBoDemGio, ICauHoi, IChamThi, IChamThiDetail, IDapAnChon, ILamBaiThi } from '../model/cham-thi.model';
import { FormChamThiComponent } from './form-cham-thi/form-cham-thi.component';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { IDapAn, IDeThi } from '../../kho-de-module/model/tao-de-thi.model';
import { IHocVien } from '../../hoc-vien-module/model/hoc-vien-model';
import { FormChamThiPhanThiComponent } from './form-cham-thi-phan-thi/form-cham-thi-phan-thi.component';

@Component({
    selector: 'app-cham-thi',
    templateUrl: './cham-thi.component.html',
    styleUrls: ['./cham-thi.component.scss']
})
export class ChamThiComponent extends BaseListComponent<ICauHoi> implements OnInit {
    private route: ActivatedRoute;
    constructor(injector: Injector) {
        super(injector);
        this.route = injector.get(ActivatedRoute);
    }
    urlCreateLamBaiThi: string = UrlConstant.ROUTE.CREATE_LAM_BAI_THI;
    urlGetLamBaiThi: string = UrlConstant.ROUTE.GET_CHAM_THI;
    urlGetDeThiInfo: string = UrlConstant.ROUTE.GET_DE_THI_ID;

    ckConfig = config.other1Option;
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
        dapAnChonSingle: 0,
        dapAnChons: [],
        lamBaiThiId: 0
    };
    currentDapAnFlag: string;
    deThiData: ICauHoi[] = [];
    deThiInfo: IDeThi;
    hocVienInfo: IHocVien;
    cauHoiTreeRoot: ICauHoi[] = [];
    cauHoiTreeLeaf: ICauHoi[] = [];
    giaoDienCauHois: ICauHoi[];
    apiService: ApiService;
    lichSuTraLoi: any;
    lstDapAnChon: IDapAnChon[];
    cauTraLoi: [];
    safeHtml: "";
    url: string = UrlConstant.ROUTE.LOAD_DE_THI;
    boDemGio: IBoDemGio[] = [];
    destroy$ = new Subject<void>();
    lamBaiThis: ILamBaiThi[] = [];
    deThiId: number;
    userDetail: string;
    isParentStart: boolean = false;
    tenPhanThi: string;
    chamThiInit: IChamThi;
    lamBaiThiId: number = 5;
    chamThiId: number;

    ngOnInit() {
        this.chamThiId = this.route.snapshot.params.chamThiId;
        super.ngOnInit();
    }

    getDataChamThi() {
        this.apiService.post(this.urlGetLamBaiThi, {
            lamBaiThiId: this.lamBaiThiId,
            chamThiId: this.chamThiId
        })
            .subscribe((res: any) => {
                this.lstDapAnChon = res.listDapAnChons as IDapAnChon[];
                this.hocVienInfo = res.hocVienDTO as IHocVien;
                this.loadInfoDeThi(res.lamBaiThiDTO.deThiId);
                this.loadDeThi(res.lamBaiThiDTO.deThiId);
            });
    }

    loadInfoDeThi(deThiId) {
        this.apiService.get(this.urlGetDeThiInfo + deThiId)
            .subscribe((res: any) => {
                this.deThiInfo = res as IDeThi;
            });
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Nhận xét",
            content: FormChamThiComponent,
            width: 500,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.isHocVien = true;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }
    protected loadItems() {
        this.chamThiInit = {
            id: this.chamThiId,
            chamThiId: this.chamThiId,
            lamBaiThiId: this.lamBaiThiId,
            nhanVienId: this.currentUser.id,
            tenChamThi: "",
            noiDungChamThi: "",
            diemThucTe: null,
            tongDiem: null,
            loaiChamThi: null,
            trangThaiChamThi: null,
            chamThiDetails: []
        }

        this.deThiId = this.route.snapshot.params.deThiId;
        this.userDetail = this.route.snapshot.params.userDetail;
        this.getDataChamThi();
        //this.loadDeThi(this.deThiId);

    }

    loadDeThi(deThiId) {
        this.apiService.post(this.url + deThiId, deThiId).subscribe((res: any) => {
            // show notification
            this.deThiData = res as ICauHoi[];
            this.maxRoot = Math.max.apply(Math, this.deThiData.map(function (o) { return o.root; }))
            this.cauHoiTreeRoot = this.deThiData.filter(e => e.level == 1);
            this.getAllRoot();
            this.getAllLeaf(0);

            //run first part
        });
    }

    getAllRoot() {
        this.cauHoiTreeRoot.forEach((element, index) => {
            this.boDemGio.push({
                id: element.root,
                ten: element.tenCauHoi,
                thoiGian: element.tongThoiGian,
                isStart: false
            })
        });
    }

    chooseRoot(item) {
        this.getAllLeaf(item.root);
        this.tenPhanThi = item.tenCauHoi;
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
        if (this.currentCauHoi?.cauTraLoi && typeof (this.currentCauHoi?.cauTraLoi) === 'undefined')
            this.currentCauHoi.cauTraLoi = "";
        let currentDapAnChon = this.lstDapAnChon?.filter(x => x.cauHoiId == this.currentCauHoi?.dapAns[0]?.cauHoiId)[0] as IDapAnChon;
        if (currentDapAnChon != null) {
            if (this.currentCauHoi.dapAns.length > 0)
                this.currentCauHoi.dapAns.map((x: IDapAn) => {
                    x.dapAnChon = currentDapAnChon.listDapAns?.includes(x.id.toString()) ? true : false;
                })
        }
        this.buildGiaoDienCauHoi(this.currentCauHoi?.id);
        this.setterDapAnFlag();
    }
    setterDapAnFlag() {
        if (this.currentCauHoi?.dapAns.length <= 1) {
            this.currentDapAnFlag = "ckeditor";
        }
        if (this.currentCauHoi?.dapAns.length > 0) {
            if (this.currentCauHoi?.dapAns.filter(r => r.isDapAnDung == true).length > 1)
                this.currentDapAnFlag = "checkbox";
        }

        if (this.currentCauHoi?.dapAns.length > 1 && this.currentCauHoi?.dapAns.filter(r => r.isDapAnDung == true).length == 1) {
            this.currentDapAnFlag = "radio";
        }
    }
    choosenCurrentCauHoi(id) {
        // console.log(id);
        let daTraLoi = this.cauHoiTreeLeaf.find(r => r.id == this.currentCauHoi.id);
        daTraLoi = this.currentCauHoi;

        this.setterCurrentCauHoi(this.cauHoiTreeLeaf.indexOf(this.cauHoiTreeLeaf.find(r => r.id == id)));
    }

    buildGiaoDienCauHoi(cauHoiId) {
        let cauHoiAffected = this.deThiData.find(r => r.id == cauHoiId);
        let orderList = cauHoiAffected?.orderDetail.split("_");
        this.giaoDienCauHois = this.deThiData?.filter(r => r.root == cauHoiAffected?.root);

        this.giaoDienCauHois = this.giaoDienCauHois?.filter(r => r.id != this.currentCauHoi.id && orderList.indexOf(r.id.toString()) >= 0);
        // console.log(this.giaoDienCauHois);
        this.giaoDienCauHois = this.giaoDienCauHois?.sort((a, b) => a.level - b.level);
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
    nextRoot() {
        this.dialogService.open(AlertDialogComponent, {
            context: {
                title: 'Xác nhận chuyển phần thi',
                message: 'Bạn có chắc chắn muốn chuyển phần thi? ',
            },
        }).onClose
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res) {
                    this.nextRootPart();
                }
            });
    }
    nextRootPart() {
        if (this.currentRoot < this.maxRoot) {
            if (this.lamBaiThis.filter(r => !this.cauHoiTreeLeaf.find(x => x.id == r.cauHoiId))) this.recordingRoot();
            this.currentRoot++;
            this.getAllLeaf(this.currentRoot);
        }
    }
    recordingRoot() {
        let records = [];
        let d = this.cauHoiTreeLeaf;
        d.forEach(element => {
            if (typeof (element.cauTraLoi) === 'undefined')
                element.cauTraLoi = "";
            if (typeof (element.dapAnChonSingle) !== 'undefined') {
                element.dapAns.forEach(e => {
                    e.dapAnChon = false;
                    if (element.dapAnChonSingle == e.id)
                        e.dapAnChon = true;
                })
            }

        })

        d.forEach(e => {
            let record = [];
            let dapAns = e.dapAns;
            dapAns.forEach(r => {
                if (typeof (r.dapAnChon) != 'undefined' && r.dapAnChon)
                    record.push(r.id);
            })
            records.push({
                userId: this.userDetail,
                userDetail: this.userDetail,
                deThiId: this.deThiId,
                cauHoiId: e.id,
                isDapAnDung: false,
                cauTraLoi: e.cauTraLoi,
                listDapAns: record,
            })
        })


        if (this.lamBaiThis.length <= 0) {
            // console.log(records);
            records.forEach(r => {
                this.lamBaiThis.push(r);
            })

        }
        else {
            records.forEach(element => {
                let aff = this.lamBaiThis.find(x => x.cauHoiId == element.cauHoiId);
                // console.log(aff);
                if (aff) {
                    this.lamBaiThis.splice(this.lamBaiThis.indexOf(aff), 1);
                    this.lamBaiThis.push(element);
                }
                if (!aff) {
                    this.lamBaiThis.push(element);
                }
            })
        }
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

    onSubmit() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Nhận xét chung từng phần thi",
            content: FormChamThiPhanThiComponent,
            width: 1000,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.cauHoiTreeRoot = this.cauHoiTreeRoot;
        param.chamThiInit = this.chamThiInit;
        windowRef.result.subscribe((res) => {
            this.opened = false;
        });
    }

    openComment(item: ICauHoi) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Nhận xét",
            content: FormChamThiComponent,
            width: 500,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.chamThiDetail = {
            id: 0,
            chamThiId: this.chamThiId,
            lamBaiThiId: this.lamBaiThiId,
            cauHoiId: this.currentCauHoi?.id,
            nhanXet: ""
        }
        let oldChamThiDetail = this.chamThiInit.chamThiDetails.find(x => x.cauHoiId == this.currentCauHoi?.id);
        if(oldChamThiDetail)
            param.chamThiDetail = oldChamThiDetail;

        windowRef.result.subscribe((result: IChamThiDetail) => {
            if (result != null && result.nhanXet != "") {
                let oldChamThiDetail = this.chamThiInit.chamThiDetails.find(x => x.cauHoiId == result.cauHoiId);
                if (oldChamThiDetail) {
                    const index = this.chamThiInit.chamThiDetails.indexOf(oldChamThiDetail, 0);
                    if (index > -1) {
                        this.chamThiInit.chamThiDetails.splice(index, 1);
                    }
                }
                this.chamThiInit.chamThiDetails.push(result);
            }
            this.opened = false;
        });
    }
}

