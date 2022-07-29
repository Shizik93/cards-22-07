import axios, {AxiosResponse} from 'axios';
import {UpdateUserDataType} from "./profile-reducer";

const settings = {
    withCredentials: true,

}

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const profileApi = {
    update(data:UpdateUserDataType) {
        const promise = instance.put('auth/me', data)
        return promise
    },
    me() {
        return instance.post<null,AxiosResponse<ResponseAuthType>>('auth/me', {})
    },

}

type ResponseAuthType = {
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
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}








