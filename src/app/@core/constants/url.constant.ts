import { environment } from "../../../environments/environment";

const prefixACL = 'ACL/';
const baseUrl = environment.apis.default.url + "/api/app";
const baseHost = environment.apis.default.url;
export const UrlConstant = {
    BASE_URL: environment.apis.default.url + "/api/app",
    UPLOAD_BASE_URL: environment.apis.default.url + "/FileUpload/UploadFiles",
    
    API: {
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
        UPLOAD_FILE: 'https://apisipm.migroup.asia/FileUpload/UploadFiles',
        STORE_FILE:'https://apisipm.migroup.asia/Uploads/',

        // Module Khách hàng
        KHACH_HANG: '/khach-hangs',
        DANH_MUC: baseUrl + '/common/du-lieu-phan-loai-by-table',
        KHACH_HANG_TRANG_THAI: '/khach-hang-trang-thais',
        KHACH_HANG_KENDO:'/khach-hangs/kendo-datatable-khach-hang',
        CHAM_SOC_KHACH_HANG_KENDO:'/cham-soc-khach-hangs/kendo-datatable-cham-soc-khach-hang',
        CHAM_SOC_KHACH_HANG:'/cham-soc-khach-hangs',
        DU_LIEU_PHAN_LOAI_BY_TABLE:'/common/du-lieu-phan-loai-and-count-by-table',
        GET_USER: 'https://apisipm.cagt.top/api/identity/users',
        TEMPLATE_FILE_IMPORT_KHACH_HANG: 'https://apisipm.cagt.top/FileTemplate/TemplateImportKhachHang.xlsx',
        FILE_IMPORT_KH: 'https://apisipm.migroup.asia/FileUpload/UploadFiles/ImportKhachHang​',


        //Module Đề thi
        CREATE_DE_THI: '/cau-hois/or-update-de-thi_v1',
        CREATE_LAM_BAI_THI: '/lam-bai-thi/luu-tru-lam-bai-thi',
        GET_UPDATE_DE_THI: '/cau-hois/collect-cau-hoi-by-de-thi-id',
        LOAD_DE_THI: '/cau-hois/collect-cau-hoi-by-de-thi-id_Float-data/',
        DE_THI_KENDO: '/de-thi/collect-kendo-datatable',
        //Module Học viên
        LOAD_LOP_HOC: 'https://apisipm.cagt.top/api/app/lop-hoc/lop-hoc-kendo-data'
    },

}
