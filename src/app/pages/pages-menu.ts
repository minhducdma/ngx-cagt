import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    //Link ICON: https://akveo.github.io/eva-icons/#/
    {
        title: 'Khách hàng',
        icon: 'people-outline',
        link: '/pages/admin/quan-ly-khach-hang/khach-hang',
        home: true, 
    },

    {
        title: 'Quản lý kho đề',
        icon: 'archive-outline',
        children: [
            {
                title: 'Danh sách đề thi',
                link: '/pages/admin/kho-de/de-thi',
            },
        ],
    },

    {
        title: 'Quản lý học viện',
        icon: 'home-outline',
        children: [
            {
                title: 'Danh sách lớp học',
                link: '/pages/admin/quan-ly-hoc-vien/danh-sach-lop-hoc',
            },
            {
                title: 'Danh sách học viên',
                link: '/pages/admin/quan-ly-hoc-vien/danh-sach-hoc-vien',
            },
            {
                title: 'Danh sách tài khoản',
                link: '/pages/admin/quan-ly-hoc-vien/danh-sach-user',
            },
        ],
    },

    {
        title: 'Danh sách dịch vụ',
        icon: 'clipboard-outline',
        children: [],
    },
    {
        title: 'Quản lý dịch vụ',
        icon: 'briefcase-outline',
        children: [
            {
                title: 'Quản lý dịch vụ',
                link: '/pages/admin/dich-vu/ql-dich-vu',
            },
            {
                title: 'Quản lý bộ sản phẩm',
                link: '/pages/admin/dich-vu/ql-bo-san-pham',
            },
        ],
    },
    {
        title: 'Danh sách đơn hàng',
        icon: 'car-outline',
        link: '/pages/admin/dich-vu/ql-don-hang',
    },
];
