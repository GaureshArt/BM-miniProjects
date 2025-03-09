export interface IGeolocationType{
    lat:string;
    long:string;
}
export interface IAddressType{
    city:string;
    geolocation:IGeolocationType;
    number:number;
    street:string;
    zipcode:string;

}
export interface IUsernameType{
    firstname:string;
    lastname:string;
}
export interface IUserType{
    address:Partial<IAddressType>;
    email:string;
    id:number;
    name:IUsernameType;
    password:string;
    phone:string;
    username:string;
}

export interface IUserTableType {
    key:number;
    firstname:string;
    lastname:string;
    city:string;
    phone:string;
    email:string;
    username:string;
    id?:number;
}
export interface IUserAddType {
    name:IUsernameType;
    address:IAddressType;
    phone:string;
    email:string;
    username:string;
    password:string;
    id?:number;
}

export interface IUseUserType{
    userData:Partial<IUserType>[];
    filterUserData:IUserTableType[] ;
    userSearchQuery:string;
    updateUserData:(data:IUserType)=>void;
    updateFilterUserData:(data:IUserTableType)=>void;
    addUserData:(data:IUserAddType)=>void;
    removeUserData:(data:number)=>void;
    setFilterUserDataByQuery:()=>void;
    setUserSearchQuery:(data:string)=>void;
}

export interface IUserUpdateFormType extends Exclude<IUserTableType,'key'>{
    id?:number;
}