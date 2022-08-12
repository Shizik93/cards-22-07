import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/', /*process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',*/
    withCredentials: true,
})

export const packsListAPI = {
    fetchPacksList(data: RequestBodyType): Promise<AxiosResponse<ResponseCardsPackListType>> {
        return instance.get<ResponseCardsPackListType>(`cards/pack`, {
            params: data
        })
    },
    deleteCardsPack(id: string): Promise<AxiosResponse<ResponseDeleteCardsPackType>> {
        return instance.delete<ResponseDeleteCardsPackType>(`cards/pack/?id=${id}`)
    },
    addNewCardsPack(title: string) {
        //<тип нашего ответа от сервера, полный тип ответа от сервера который обернут в объект аксиоса, тип даты который мы отправляем на сервер>
        return instance.post<ResponseAddNewCardsPackType, AxiosResponse<ResponseAddNewCardsPackType>, RequestAddNewCardsPackType>(`cards/pack`, {cardsPack: {name: title}})
    },
    editCardsPack(id: string, newTitle: string) {
        return instance.put<ResponseEditCardsPackType, AxiosResponse<ResponseEditCardsPackType>, RequestEditCardsPackType>(`cards/pack/`,
            {cardsPack: {_id: id, name: newTitle}})
    }
}
export type RequestBodyType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: any
    page?: number
    pageCount?: number
    user_id?: string
}

export type ResponseDeleteCardsPackType = {
    deletedCardsPack: CardPackItemsType;
    token: string;
    tokenDeathTime: number;
}
export type ResponseAddNewCardsPackType = {
    newCardsPack: CardPackItemsType;
	token: string;
	tokenDeathTime: number;
}
export type ResponseEditCardsPackType = {
    updatedCardsPack: CardPackItemsType;
    token: string;
    tokenDeathTime: number;
}
export type RequestAddNewCardsPackType = {
    cardsPack: { name: string }
}
export type RequestEditCardsPackType = {
    cardsPack: {
        _id: string,
        name: string
    }
}


export type ResponseCardsPackListType = {
    cardPacks: CardPackItemsType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}
export type CardPackItemsType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
    deckCover?: any;
}

//
// export type RootObject = {
// 	cardPacks: RootObjectCardPacks[];
// 	page: number;
// 	pageCount: number;
// 	cardPacksTotalCount: number;
// 	minCardsCount: number;
// 	maxCardsCount: number;
// 	token: string;
// 	tokenDeathTime: number;
// }
// export type RootObjectCardPacks = {
// 	_id: string;
// 	user_id: string;
// 	user_name: string;
// 	private: boolean;
// 	name: string;
// 	path: string;
// 	grade: number;
// 	shots: number;
// 	cardsCount: number;
// 	type: string;
// 	rating: number;
// 	created: string;
// 	updated: string;
// 	more_id: string;
// 	__v: number;
// }


export type RootObject = {
	newCardsPack: RootObjectNewCardsPack;
	token: string;
	tokenDeathTime: number;
}
export type RootObjectNewCardsPack = {
	_id: string;
	user_id: string;
	user_name: string;
	private: boolean;
	name: string;
	path: string;
	grade: number;
	shots: number;
	cardsCount: number;
	type: string;
	rating: number;
	created: string;
	updated: string;
	more_id: string;
	__v: number;
}