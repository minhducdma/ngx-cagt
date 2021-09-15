export interface IUser{
    email: string;
    emailVerified: boolean;
    id: string;
    impersonatorTenantId: string;
    impersonatorUserId: string;
    isAuthenticated: boolean;
    name: string;
    phoneNumber: string;
    phoneNumberVerified: boolean;
    roles: [];
    surName: string;
    tenantId: string;
    userName: string;
}