import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const registAPI = {
    regist(data: RegistParamsType) {
        return instance.post<RegistParamsType, AxiosResponse<ResponseType>>(`auth/register`, data)
    }
}
export type AuthParamsType = {
    resultCode: number
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}
export type RegistParamsType = {
    email: string,
    password: string
}
export type ResponseType<D = {}> = {
    addedUser: D,
    error?: string;
}