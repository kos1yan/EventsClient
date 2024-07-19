type Tokens = {
    accessToken: string;
    refreshToken: string;
}

type Role = 'Admin' | 'User' | 'None';

type DecodedToken = {
    userEmail: string;
    userRole: Role;
    userId: string;
    exp: number;
}

export type {
    Tokens,
    Role,
    DecodedToken
}