import { environment } from "../../../environments/environment";

const prefixACL = 'ACL/';
const baseUrl = environment.apis.default.url + "/api/app";
const baseHost = environment.apis.default.url;
export const UrlConstant = {
    BASE_URL: environment.apis.default.url + "/api/app",
    UPLOAD_BASE_URL: environment.apis.default.url + "/FileUpload/UploadFiles",
    IDENTITY_BASE_URL : environment.apis.default.url + '/api/identity/users',
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
        UPDATE_CHAM_SOC_KHACH_HANG: '/cham-soc-khach-hangs/cham-soc-khach-hang-and-change-kich-ban',
        DE_THI_KENDO: '/de-thi/collect-kendo-datatable',
        GET_DE_THI_ID:'https://apisipm.cagt.top/api/app/de-thi/',
        //Module Học viện
        HOC_VIEN_KENDO: '/hoc-vien/collect-kendo-datatable',
        HOC_VIEN: '/hoc-vien',
        LOP_HOC_KENDO: '/lop-hoc/get-lop-hoc-kendo-data',
        LOP_HOC_GETID: '/lop-hoc/collect-full-detail-lop-hoc',
        LICH_DETAIL: '/lich-detail',
        HOC_VIEN_LOP_HOC: '/hoc-vien-lop-hoc',
        LOP_HOC_SAVE: '/lop-hoc/save-lop-hoc',
        NHAN_VIEN_KENDO: '/nhan-vien/collect-nhan-vien-or-kendo-datatable',
        ADD_UPDATE_NHAN_VIEN: '/nhan-vien/or-update-nhan-vien',
        DICH_VU_KENDO: '/dich-vu/collect-kendo-datatable',
        DICH_VU_GET_MENU: 'https://apisipm.cagt.top/api/app/dich-vu',
        DICH_VU: '/dich-vu',
        BO_SAN_PHAM_KENDO: '/bo-san-pham/collect-kendo-datatable',
        BO_SAN_PHAM: '/bo-san-pham',
        SAN_PHAM_KENDO: '/san-pham/collect-kendo-datatable',
        SAN_PHAM: '/san-pham',
        DON_HANG_KENDO: '/don-hang/collect-don-hang-kendo-data',
        DON_HANG: '/don-hang',
        GET_CHAM_THI: '/cham-thi/collect-cham-thi-with-detail_v2',
        SAVE_CHAM_THI: '/cham-thi/create_or-update-cham-thi-with-detail_v1'
    },

}
