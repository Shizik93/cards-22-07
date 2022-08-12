import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/', /*process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',*/
    withCredentials: true,
})

export const cardsListAPI = {
    fetchCardsList(body:RequestBodyCardsType): Promise<AxiosResponse<ResponseCardsListType>> {
        return instance.get<ResponseCardsListType>(`cards/card`, {
            params: body
            // cardsPack_id:body.cardsPack_id
        })
    },
    deleteCard(id: string): Promise<AxiosResponse<ResponseDeleteCardType>> {
        return instance.delete<ResponseDeleteCardType>(`cards/card/?id=${id}`)
    },
    addNewCard(id: string, question: string, answer: string) {
        //<тип нашего ответа от сервера, полный тип ответа от сервера который обернут в объект аксиоса, тип даты который мы отправляем на сервер>
        return instance.post<ResponseAddNewCardType, AxiosResponse<ResponseAddNewCardType>, RequestAddNewCardType>(`cards/card?id=${id}`, {
            card: {
                cardsPack_id: id, question:question, answer: answer
            }
        })
    },
    editCard(id: string, newQuestion: string, newAnswer: string) {
        return instance.put<ResponseEditCardType, AxiosResponse<ResponseEditCardType>, RequestEditCardType>(`cards/card/?id=${id}`,
            {
                card: {
                    _id: id, question: newQuestion,
                    answer: newAnswer
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
    // updatePage(data:RequestBodyCardsType): Promise<AxiosResponse<ResponseCardsListType>> {
    //     return instance.get<ResponseCardsListType>(`cards/card`, {
    //         params: data
    //     })
    // },
}

/*export type CardItemsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: null
    shots: null
    user_id: string
    created: string
    updated: string
    _id: string
}*/

export type ResponseCardsListType = {
    cards: Array<CardItemsType>,
    packUserId: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
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
export type RequestBodyCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string,
    page?: number
    pageCount?: number
}

export type ResponseDeleteCardType = {
    deletedCard: {}
}

export type ResponseEditCardType = {
    updatedCard: CardItemsType;
    token: string;
    tokenDeathTime: number;
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
        answer: string
        comments?: string
    }
}

/*export type RequestAddNewCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: null | number
        shots?: null | number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}*/



export type ResponseAddNewCardType = {
	newCard: CardItemsType;
	token: string;
	tokenDeathTime: number;
}
export type CardItemsType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
    answerImg: string;
    answerVideo: string;
    questionImg: string;
    questionVideo: string;
}
export type RequestUpdateGradeCardType = {
    grade: number | null
    card_id: string
}
