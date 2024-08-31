//用户类别
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?: string;
    gender: string;
    phone: string;
    email: string;s
    userStatus: number;
    userRole: string;
    planetCode: string;
    tags:string [];
    createTime: Date;
};