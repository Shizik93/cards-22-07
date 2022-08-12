import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/', /*process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',*/
    withCredentials: true,
})

export const cardsListAPI = {
    fetchCardsList({id}: { id: string }): Promise<AxiosResponse<ResponseCardsListType>> {
        return instance.get<ResponseCardsListType>(`cards/card`, {
            params: {
                cardsPack_id: id
            }
        })
    },
    deleteCard(id: string): Promise<AxiosResponse<ResponseDeleteCardType>> {
        return instance.delete<ResponseDeleteCardType>(`cards/card/?id=${id}`)
    },
    addNewCard(id: string) {
        //<тип нашего ответа от сервера, полный тип ответа от сервера который обернут в объект аксиоса, тип даты который мы отправляем на сервер>
        return instance.post<ResponseAddNewCardType, AxiosResponse<ResponseAddNewCardType>, RequestAddNewCardType>(`cards/card?id=${id}`, {
            card: {
                cardsPack_id: id
            }
        })
    },
    editCard(id: string) {
        return instance.put<ResponseEditCardType, AxiosResponse<ResponseEditCardType>, RequestEditCardType>(`cards/card/?id=${id}`,
            {
                card: {
                    _id: id, question: 'new question',
                    comments: 'new comments'
                }
            })
    },
    gradeCard(id: string, grade: number| null) {
        return instance.put<ResponseUpdateGradeCardType, AxiosResponse<ResponseUpdateGradeCardType>, RequestUpdateGradeCardType>(`cards/grade`,
            {
                grade: grade,
                card_id: id,
                    })

    },
    updatePage(id: string, value: number) {
        return instance.get<ResponseAddNewCardType, AxiosResponse<ResponseAddNewCardType>, RequestAddNewCardType>('cards/card', {
            params: {
                cardsPack_id: id,
                pageCount:value
            }
        })

    },
}

export type CardItemsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: null
    shots: null
    user_id: string
    created: string
    updated: string
    _id: string
}

export type ResponseCardsListType = {
    cards: Array<CardItemsType>,
    cardsTotalCount: null
    maxGrade: null
    minGrade: null
    page: null
    pageCount: null
    packUserId: string
}

export type ResponseUpdateGradeCardType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}

export type ResponseDeleteCardType = {
    deletedCard: {}
}

export type ResponseAddNewCardType = {
    newCard: {}
}

export type ResponseEditCardType = {
    updatedCard: {}
}
export type RequestAddNewCardType = {
    card: {
        cardsPack_id: string
        question?: string // если не отправить будет таким
        answer?: string // если не отправить будет таким
        grade?: null | number // 0..5, не обязателен
        shots?: null | number // не обязателен
        answerImg?: string // не обязателен
        questionImg?: string // не обязателен
        questionVideo?: string // не обязателен
        answerVideo?: string // не обязателен
    }
}

export type RequestEditCardType = {
    card: {
        _id: string
        question: string
        comments: string
    }
}
export type RequestUpdateGradeCardType = {
    grade: number | null
    card_id: string
}
