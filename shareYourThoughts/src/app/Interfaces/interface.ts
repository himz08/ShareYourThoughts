export interface PostStatusInfo {
    userId: string;
    userName: string;
    dateTime: Date;
    tittle: string;
    message: string;
    picUrl: string;
    likes: string[];
    disLikes: string[];
    postId: string;
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

export interface GetUserDetails {
    localId: string,
    email: string,
    emailVerified: boolean,
    displayName: string,
    providerUserInfo: any[]
    photoUrl: string,
    passwordHash: string,
    passwordUpdatedAt: any,
    validSince: string,
    disabled: boolean,
    lastLoginAt: string,
    createdAt: string,
    customAuth: boolean
}

export interface PostComments {
    userId: string;
    userName: string;
    dateTime: Date;
    message: string;
    picUrl: string;
    likes: string[];
    disLikes: string[];
    commentId: string;
    replyComments : PostComments[]
}