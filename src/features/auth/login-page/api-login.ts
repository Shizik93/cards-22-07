import axios, {AxiosResponse} from "axios";
type DataType={
    name:string
    avatar: string | ArrayBuffer | null
}
type UpdateUserResponse={
    updatedUser:ResponseLoginType
    error?:string
}
type ResponseLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
type LogOutType = {
    info: string
    error: string;
}

const instance = axios.create({
        baseURL: 'https://neko-back.herokuapp.com/2.0/',
        withCredentials: true
    }
)

export const apiLogin = {
    setLogin(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseLoginType>>('auth/login', {
            email,
            password,
            rememberMe
        })
    },
    me() {
        return instance.post<null,AxiosResponse<ResponseLoginType>>('auth/me', {})
    },
    logOut() {
        return instance.delete<null,AxiosResponse<LogOutType>>('auth/me', {})
    },
    updateUser(data:DataType){
        return instance.put<null,AxiosResponse<UpdateUserResponse>>('auth/me',data)
    }

}

