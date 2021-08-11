import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { KhachHangExampleData } from '../../../@core/data/khach-hang-demo';

@Component({
    selector: 'ngx-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['.//khach-hang.component.scss'],
})
export class KhachHangComponent implements OnInit {

    source: LocalDataSource = new LocalDataSource();

    constructor(private service: KhachHangExampleData) {
        const data = this.service.getData();
        this.source.load(data);
    }

    ngOnInit(): void {
    }
    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'ID',
                type: 'number',
            },
            hoTen: {
                title: 'Họ tên',
                type: 'string',
            },
            ngaySinh: {
                title: 'Ngày sinh',
                type: 'string',
            },
            gioiTinh: {
                title: 'Giới tính',
                type: 'string',
            },
            diaChi: {
                title: 'Địa chỉ',
                type: 'string',
            },
            soDienThoai: {
                title: 'Số điện thoại',
                type: 'string',
            },
            email: {
                title: 'Email',
                type: 'string',
            },
            loaiKhachHang: {
                title: 'Loại khách hàng',
                type: 'string',
            },
        },
    };

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

}
