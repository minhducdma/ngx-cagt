import { environment } from "../../../environments/environment";

const prefixACL = 'ACL/';
export const UrlConstant = {
    BASE_URL: environment.apiUrl,

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

        KHACH_HANG: '/khach-hangs',
    },
    
}