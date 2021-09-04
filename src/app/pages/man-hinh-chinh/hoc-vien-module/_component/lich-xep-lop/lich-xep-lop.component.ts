import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import { MatMenuTrigger } from '@angular/material/menu';
import { BaseListComponent } from '../../base/base-list.component';
import { ILopHoc } from '../../model/lop-hoc-model';
import { ActionEnum } from '../../../../../@core/constants/enum.constant';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { FormLichDetailComponent } from './form-lich-detail/form-lich-detail.component';
import { ILichDetail } from '../../model/lich-detail-model';
import { AlertDialogComponent } from '../../../../../shared/controls/alert-dialog/alert-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '../../../../../@core/constants/url.constant';

@Component({
    selector: 'app-lich-xep-lop',
    templateUrl: './lich-xep-lop.component.html',
    styleUrls: ['./lich-xep-lop.component.scss']
})
export class LichXepLopComponent extends BaseListComponent<ILopHoc> implements OnInit, OnChanges {
    @Input() dataInput = [];
    @Input() lichId = 0;
    @Output() dataOutput = new EventEmitter<any>();

    @ViewChild(MatMenuTrigger)
    contextMenu: MatMenuTrigger;
    contextMenuPosition = { x: '0px', y: '0px' };
    calendarVisible = true;
    calendarOptions: CalendarOptions = {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventDrop: this.handleEvents.bind(this),
        locale: 'vi',
        height: 600,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
    };
    currentDataSelectId;
    selectCurrentInfo: DateSelectArg = null;
    currentEvents: EventApi[] = [];
    fromDateForm: string = '';
    toDateForm: string = '';

    constructor(
        injector: Injector
    ) {
        super(injector)
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.dataInput.length > 0)
            this.loadItems();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    handleCalendarToggle() {
        this.calendarVisible = !this.calendarVisible;
    }

    handleWeekendsToggle() {
        const { calendarOptions } = this;
        calendarOptions.weekends = !calendarOptions.weekends;
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        this.selectCurrentInfo = selectInfo;
    }

    handleEventClick(clickInfo: EventClickArg) {
        this.showMessage('info', 'Lưu ý', 'Đang chọn: ' + clickInfo.event.title);
        this.currentDataSelectId = clickInfo.event.id;
    }

    handleEvents(events) {
        const rangeDate = events.event._instance.range;
        const id = events.event._def.publicId;

        //Update Data when drag

        const model = this.dataInput.find(x=>x.id == Number(id));
        if(model){
            model.thoiGianBatDau = rangeDate.start;
            model.thoiGianKetThuc = rangeDate.end;
    
            this.apiService
            .put('/lich-detail/' + id, model)
            .subscribe(res => {
                // show notification
                this.notification.show('Cập nhật thành công','Thành công', { status :'success' });
                // close form
                this.dataOutput.emit(true);
            });
        }
    }

    onContextMenu(event: MouseEvent, item: EventClickArg) {
        event.preventDefault();
        this.contextMenuPosition.x = event.clientX + 'px';
        this.contextMenuPosition.y = event.clientY + 'px';
        this.contextMenu.menuData = { 'item': this.currentDataSelectId };
        this.contextMenu.menu.focusFirstItem('mouse');
        this.contextMenu.openMenu();
        event.stopPropagation();
        this.currentDataSelectId = null;
    }

    editDataHandler(id) {
        const dataItem = this.dataInput.find(x => x.id == id);
        this.action = ActionEnum.UPDATE;
        this.model = dataItem;
        this.showFormCreateOrUpdate();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: "Cập nhật lịch",
            content: FormLichDetailComponent,
            width: 800,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.lichId = this.lichId;
        param.thoiGianBatDau = this.fromDateForm;
        param.thoiGianKetThuc = this.toDateForm;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.dataOutput.emit(true);
            }
        });
    }

    loadItems() {
        if (this.dataInput.length > 0) {
            this.calendarOptions.events = this.convertToDataCalendar(this.dataInput);
        }
    }

    addNewDateSelect() {
        if (this.selectCurrentInfo != null) {
            this.handleDateSelect(this.selectCurrentInfo);
            const calendarApi = this.selectCurrentInfo.view.calendar;

            calendarApi.unselect(); // clear date selection

            this.action = ActionEnum.CREATE;
            this.model = undefined;
            this.fromDateForm = this.selectCurrentInfo.startStr,
            this.toDateForm = this.selectCurrentInfo.endStr,
                    this.showFormCreateOrUpdate();

            // const title = prompt('Please enter a new title for your event');

            // if (title) {
            //     let item = {
            //         id: createEventId(),
            //         title,
            //         start: this.selectCurrentInfo.startStr,
            //         end: this.selectCurrentInfo.endStr,
            //         allDay: this.selectCurrentInfo.allDay
            //     }
            //     calendarApi.addEvent(item);

            //     this.exampleData.push(item);
            // }


        }

    }

    convertToDataCalendar(dataInput: ILichDetail[]) {
        return dataInput.map(x => {
            return {
                id: x.id.toString(),
                title: x.tenDatLich,
                start: x.thoiGianBatDau,
                end: x.thoiGianKetThuc
            }
        })
    }

    removeHandler(id) {
        let dataItem = this.dataInput.find(x => x.id == id);
        this.dialogService.open(AlertDialogComponent, {
            context: {
                title: 'Xác nhận xóa: ' + dataItem.tenDatLich,
                message: 'Bạn có chắc chắn muốn xóa?',
            },
        }).onClose
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res) {
                    this.apiService.delete('/lich-detail/' + id).subscribe(res => {
                        this.selectionIds = [];
                        this.showMessage('success', 'Thành công', 'Xóa thành công');
                        this.dataOutput.emit(true);
                    });
                }
            });
    }

    submit() {
        console.log(this.dataInput);
    }
}