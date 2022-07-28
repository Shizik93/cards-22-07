import axios, {AxiosResponse} from "axios";

type ResponseLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
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
        return instance.post<AxiosResponse<ResponseLoginType>>('auth/me', {})
    },
    logOut() {
        return instance.delete<AxiosResponse<LogOutType>>('auth/me', {})
    },

}

