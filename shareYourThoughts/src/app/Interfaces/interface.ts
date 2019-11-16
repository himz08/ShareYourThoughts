export interface PostStatusInfo {
    userId : string;
    userName : string;
    dateTime : Date;
    tittle : string;
    message : string;
    picUrl : string;
}

export interface AuthResponseData {
    idToken : string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered?: string;
}