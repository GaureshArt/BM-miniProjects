export interface IAuthFormType{
    username:string;
    password:string;
}
export const enum Role{
    admin,
    user
}
export interface IUseAuthType {
    role:Role;
    username:string;
    id:number;
    setRole:(data:boolean)=>void;
    setUsername:(data:string)=>void;
    setId:(data:number)=>void;
}