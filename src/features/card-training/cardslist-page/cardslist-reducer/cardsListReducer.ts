import {AppActionsType, AppThunk} from "../../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {
    CardItemsType,
    cardsListAPI,
    ResponseAddNewCardType,
    ResponseEditCardType,
    ResponseCardsListType
} from "../api-cardslist/api-cardsList";

export const initCardsListState = {
    cards: [] as CardItemsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    requestBodyCards:{
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        sortCards: 1 + '',
        page: 1,
        pageCount: 7
    }
}
const SET_PAGE_CARDS_LIST = "cardsList/SET_PAGE_CARDS_LIST"
const SET_PAGE_COUNT_CARDS_LIST = "cardsList/SET_PAGE_COUNT_CARDS_LIST"
const SET_SORT_CARD_VALUE_COLUMN = "cardsList/SET_SORT_VALUE_COLUMN"
export const cardsListReducer = (state: InitCardsListStateType = initCardsListState, action: AppActionsType): InitCardsListStateType => {
    switch (action.type) {
        case 'FETCH-CARDSLIST':
            // const newCard = {answer: 'hgvhg',
            //     question: 'jkkkkkkkkkk',
            //     cardsPack_id: 'nbbbbbbbb',
            //     grade: null,
            //     shots: null,
            //     user_id: 'dfbdfbd',
            //     created: 'eeeee',
            //     updated: 'rrrrrr',
            //     _id: 'rrrgttgtttt'}
            return {
                ...state,
                cards: [...action.payload.cards],
                cardsTotalCount: action.payload.cardsTotalCount,
                maxGrade: action.payload.maxGrade,
                minGrade: action.payload.minGrade,
                page: action.payload.page,
                pageCount: action.payload.pageCount,
                packUserId: action.payload.packUserId
            }
        case 'DELETE-CARD':
            return {...state, cards: state.cards.filter(tl => tl._id !== action.payload)}
        case 'ADD-NEW-CARD':
            return {...state, cards: [{...action.payload.newCard}, ...state.cards], token: action.payload.token, tokenDeathTime: action.payload.tokenDeathTime}
        case 'EDIT-CARD':
            return {...state, cards: state.cards.map(el=> el._id===action.payload.updatedCard._id?action.payload.updatedCard: el), token: action.payload.token, tokenDeathTime: action.payload.tokenDeathTime}
        case SET_PAGE_CARDS_LIST:
            return {...state,requestBodyCards:{...state.requestBodyCards,page:action.payload.page}}
        case SET_PAGE_COUNT_CARDS_LIST:
            return {...state,requestBodyCards:{...state.requestBodyCards,pageCount:action.payload.pageCount}}
        case SET_SORT_CARD_VALUE_COLUMN:
            return {...state,requestBodyCards: {...state.requestBodyCards,sortCards: action.payload.sortPacks.value + action.payload.sortPacks.name}}
        default:
            return state
    }
}
export const FetchCardsListAC = (payload: ResponseCardsListType) =>
    ({
        type: 'FETCH-CARDSLIST', payload
    } as const)

export const DeleteCardAC = (payload: string) =>
    ({
        type: 'DELETE-CARD', payload
    } as const)
export const AddNewCardAC = (payload: ResponseAddNewCardType) =>
    ({
        type: 'ADD-NEW-CARD', payload
    } as const)
export const EditCardAC = (payload: ResponseEditCardType) =>
    ({
        type: 'EDIT-CARD', payload
    } as const)
export const setPageAC = (payload: {page: number})=>({type:SET_PAGE_CARDS_LIST, payload}as const)
export const setPageCountAC = (payload: {pageCount: number})=>({type:SET_PAGE_COUNT_CARDS_LIST, payload}as const)
export const setSortCardsColumnAC = (payload: {sortPacks: { value: number, name: string}})=>({type:SET_SORT_CARD_VALUE_COLUMN, payload}as const)

export const FetchCardsListTC = ({id}: { id: string }): AppThunk => async (dispatch, getState) => {
    const state = getState().cardsList.requestBodyCards
    const requestCardsBody = {
        cardAnswer: state.cardAnswer,
        cardQuestion: state.cardQuestion,
        cardsPack_id: id,
        sortCards: state.sortCards,
        page: state.page,
        pageCount: state.pageCount
    }
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await cardsListAPI.fetchCardsList(requestCardsBody)
        dispatch(FetchCardsListAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const DeleteCardTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await cardsListAPI.deleteCard(id)
        dispatch(DeleteCardAC(id))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const AddNewCardTC = (id: string, question: string, answer: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await cardsListAPI.addNewCard(id, question, answer)
        dispatch(AddNewCardAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const EditCardTC = (id: string, newQuestion: string, newAnswer: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await cardsListAPI.editCard(id, newQuestion, newAnswer)
        dispatch(EditCardAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}
export const GradeCardTC = ( id: string, grade:number|null): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await cardsListAPI.gradeCard(id,grade)
        dispatch(FetchCardsListTC({id: res.data.updatedGrade.cardsPack_id}))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}
// export const updatePageCardTC = ({id}: { id: string }): AppThunk => async (dispatch,getState) => {
//     const state = getState().cardsList.requestBodyCards
//     const requestBody = {
//         cardAnswer: state.cardAnswer,
//         cardQuestion: state.cardQuestion,
//         cardsPack_id: state.cardsPack_id,
//         min: state.min,
//         max: state.max,
//         sortCards: state.sortCards,
//         page: state.page,
//         pageCount: state.pageCount
//     }
//     try {
//         dispatch(setAppStatusAC('loading'))
//         const res = await cardsListAPI.updatePage(requestBody)
//         dispatch(FetchCardsListTC({id:requestBody.cardsPack_id}))
//         dispatch(setAppStatusAC('succeded'))
//     } catch (error: any) {
//         dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))
//
//     } finally {
//         dispatch(setAppStatusAC('failed'))
//     }
// }

export type InitCardsListStateType = typeof initCardsListState
export type CardsListActionsType = FetchCardsListActionsType | DeleteCardActionsType | AddNewCardActionsType
    | EditCardActionsType
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setSortCardsColumnAC>
export type FetchCardsListActionsType = ReturnType<typeof FetchCardsListAC>
export type DeleteCardActionsType = ReturnType<typeof DeleteCardAC>
export type AddNewCardActionsType = ReturnType<typeof AddNewCardAC>
export type EditCardActionsType = ReturnType<typeof EditCardAC>
