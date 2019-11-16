export interface PostStatusInfo {
    userId: string;
    userName: string;
    dateTime: Date;
    tittle: string;
    message: string;
    picUrl: string;
    likes: number;
    disLikes: number;
}

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string;
}

export interface UpdateProfile {
    localId: string,
    email: string,
    displayName: string,
    photoUrl: string,
    passwordHash: string,
    providerUserInfo: any,
    idToken: string,
    refreshToken: string,
    expiresIn: string
}