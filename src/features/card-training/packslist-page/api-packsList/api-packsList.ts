import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const packsListAPI = {
    packsList(): Promise<AxiosResponse<ResponsePacksListType>> {
        return instance.get<ResponsePacksListType>(`cards/pack`)
    }
}
//
// export type packsListParamsType = {
//
// }
export type CardPackItemsType = {
    _id: string
    // user_id?: string
    user_name: string
    name: string
    cardsCount: number
    // created?: string
    updated: string
}

export type ResponsePacksListType = {
    cardPacks: Array<CardPackItemsType>,
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number  // выбранная страница
    pageCount: number
    // количество элементов на странице

}