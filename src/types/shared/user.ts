export interface IUser {
    id: number,
    username: string,
    creationDate: Date,
    lastModified: Date | null,
    deletedAt: Date | null,
}

export type TUser = IUser;