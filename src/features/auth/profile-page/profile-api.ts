import axios, {AxiosResponse} from 'axios';
import {UpdateUserDataType} from "./profile-reducer";
import {RequestBodyType} from "../../packCardManager/page/page-reducer";

const settings = {
    withCredentials: true,

}

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'https://localhost:7542/2.0/',

    ...settings
})

export const profileApi = {
    update(data:UpdateUserDataType) {
        return instance.put('auth/me', data)
    },
    me() {
        return instance.post<null,AxiosResponse<ResponseAuthType>>('auth/me', {})
    },

}
export const pageAPI = {
    getCards(data:RequestBodyType) {
        return instance.get<null,AxiosResponse<ResponsePageType>>(`cards/pack/?packName=${data.packName}&page=${data.page}&pageCount=${data.pageCount}`)
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

export type ResponsePageType = {
    cardPacks: [
        {
            _id: string // id cardsPack
            user_id: string
            name: string
            cardsCount: number
            created: string
            updated: string
        }
    ],
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
// количество элементов на странице}
}






