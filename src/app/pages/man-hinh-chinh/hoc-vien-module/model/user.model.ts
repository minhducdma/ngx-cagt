import { IGenerice } from "./base.model";

export interface IUser{
    id: string,
    creationTime: string,
    creatorId: string,
    lastModificationTime: string,
    lastModifierId: string,
    isDeleted: boolean,
    deleterId: string,
    deletionTime: string,
    tenantId: string,
    userName: string,
    name: string,
    surname: string,
    email: string,
    emailConfirmed: boolean,
    phoneNumber: string,
    phoneNumberConfirmed: boolean,
    lockoutEnabled: boolean,
    lockoutEnd: string,
    concurrencyStamp: string,
    extraProperties: {
        additionalProp1: string,
        additionalProp2: string,
        additionalProp3: string
    }
}