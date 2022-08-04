import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const packsListAPI = {
    fetchPacksList(): Promise<AxiosResponse<ResponseCardsPackListType>> {
        return instance.get<ResponseCardsPackListType>(`cards/pack`)
    },
    deleteCardsPack(id: string): Promise<AxiosResponse<ResponseDeleteCardsPackType>> {
        return instance.delete<ResponseDeleteCardsPackType>(`cards/pack/?id=${id}`)
    },
    addNewCardsPack() {
        //<тип нашего ответа от сервера, полный тип ответа от сервера который обернут в объект аксиоса, тип даты который мы отправляем на сервер>
        return instance.post<ResponseAddNewCardsPackType, AxiosResponse<ResponseAddNewCardsPackType>, RequestAddNewCardsPackType>(`cards/pack`, {cardsPack: {name: 'DenisPL'}})
    },
    editCardsPack(id: string) {
        return instance.put<ResponseEditCardsPackType, AxiosResponse<ResponseEditCardsPackType>, RequestEditCardsPackType>(`cards/pack/`,
            {cardsPack: { _id: id, name: 'DeniKonst'}})
    }
}

export type CardPackItemsType = {
    _id: string
    // user_id?: string
    user_name: string
    name: string
    cardsCount: null
    // created?: string
    updated: string
}

export type ResponseCardsPackListType = {
    cardPacks: Array<CardPackItemsType>,
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number  // выбранная страница
    pageCount: number
    // количество элементов на странице
}


export type ResponseDeleteCardsPackType = {
    deletedCardsPack: {}
}
export type ResponseAddNewCardsPackType = {
    newCardsPack: {}
}
export type ResponseEditCardsPackType = {
    updatedCardsPack: {}
}
export type RequestAddNewCardsPackType = {
    cardsPack: { name: string }
}
export type RequestEditCardsPackType = {
    cardsPack: { _id: string,
    name: string}
}
