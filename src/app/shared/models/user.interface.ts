export interface User{
    username: string;
    password: string;
}

export interface UserResponse{
    message : string;
    code : number;
    token?: string;
}