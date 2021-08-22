import { environment } from "../../../environments/environment";

const prefixACL = 'ACL/';
const baseUrl = environment.apis.default.url + "/api/app";
export const UrlConstant = {
    BASE_URL: environment.apis.default.url + "/api/app",

    API: {
        //List API in here

        // PERMISSION
        ACL_ACCOUNT: prefixACL + 'Accounts',
        ACL_PERMISSION: prefixACL + 'Permissions',
        ACL_USER: prefixACL + 'Users',
        ACL_USER_DEVICE_DETAIL: prefixACL + 'UserDeviceDetails',
        ACL_PERMISSION_GROUP_USER: prefixACL + 'PermissionGroupUsers',
        ACL_PERMISSION_GROUP: prefixACL + 'PermissionGroups',
        ACL_PERMISSION_GROUP_ACTION: prefixACL + 'PermissionGroupActions',
        ACL_GROUP_CREATION_PERMISSION: prefixACL + 'GroupCreationPermissions',
    },

    ROUTE: {
        LOGIN: '/login',
        // DASHBOARD: '/management/dashboard',
        // FORBIDEN: '/management/403',
        // PROFILE: '/management/profile',
        // MODULE: '/management/module',
        UPLOAD_FILE: 'https://apisipm.migroup.asia/FileUpload/UploadFiles',
        STORE_FILE:'https://apisipm.migroup.asia/Uploads/',

        KHACH_HANG: '/khach-hangs',
        DANH_MUC: baseUrl + '/common/du-lieu-phan-loai-by-table',
        KHACH_HANG_TRANG_THAI: '/khach-hang-trang-thais',
        KHACH_HANG_KENDO:'/khach-hangs/kendo-datatable-khach-hang',
        CREATE_DE_THI: '/cau-hois/or-update-de-thi_v1',
        LOAD_DE_THI: '/cau-hois/collect-cau-hoi-by-de-thi-id_Float-data/1',
        // KHACH_HANG_TRANG_THAI: '/khach-hang-trang-thais',
        // KHACH_HANG_KENDO:'/khach-hangs/kendo-datatable-khach-hang',
        CHAM_SOC_KHACH_HANG_KENDO:'/cham-soc-khach-hangs/kendo-datatable-cham-soc-khach-hang',
        CHAM_SOC_KHACH_HANG:'/cham-soc-khach-hangs',
        DU_LIEU_PHAN_LOAI_BY_TABLE:'/common/du-lieu-phan-loai-and-count-by-table',
        GET_USER: 'https://apisipm.cagt.top/api/identity/users'
    },

}
