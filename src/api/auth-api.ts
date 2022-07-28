import axios from 'axios';
import {UpdateUserDataType} from "../features/auth/profile-page/profile-reducer";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '26ffa3e6-cad0-4cf9-8170-904cae9d9ac2'
    }

}

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const authAPI = {
    authMe() {
        const promise = instance.post('/auth/me')
        return promise
    },
    login(data:LoginDataType) {
        const promise = instance.post<AuthLoginResponseType>('auth/login',data)
        return promise
    },
    register(data:RegisterFormDataType){
        const promise = instance.post('auth/register',data)
        return promise
    },
    logout() {
        const promise = instance.delete('auth/me')
        return promise
    },
    update(data:UpdateUserDataType) {
        const promise = instance.put('auth/me',data)
        return promise
    }

}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


export type AuthLoginResponseType = {
    "_id": string | null,
    "email": string | null,
    "rememberMe": boolean,
    "isAdmin": boolean,
    "name": string,
    avatar?: string | null
    "verified": boolean,
    "publicCardPacksCount": number | null,
    "created": string | null,
    "updated": string | null,
    "__v": number | null,
    "token": string | null,
    "tokenDeathTime": number | null
}
export type RegisterFormDataType = {
    email: string
    password: string
    confirmPassword: string
}





