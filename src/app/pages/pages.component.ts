import { Component, OnInit } from '@angular/core';
import { UrlConstant } from '../@core/constants/url.constant';
import { ApiService } from '../@core/services/api.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
    urlDichVu: string = UrlConstant.ROUTE.DICH_VU;

    constructor(
        protected apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.loadDanhSachDichVu();
    }

    loadDanhSachDichVu() {
        this.apiService
            .get(this.urlDichVu+'?Sorting=ten')
            .subscribe((res: any) => {
                const data = res.items.map(x => {
                    return {
                        title: x.ten,
                        link: '/pages/admin/dich-vu/ql-dich-vu',
                    }
                })

                var dichVuMenu = this.menu.find((x: any) => x.title == 'Dịch vụ');
                dichVuMenu.children = [
                    ...data,
                    ...dichVuMenu.children,
                ];
            });
    }

    menu = MENU_ITEMS;


}
