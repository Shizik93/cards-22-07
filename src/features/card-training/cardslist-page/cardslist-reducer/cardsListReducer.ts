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
    cardsTotalCount: null,
    maxGrade: null,
    minGrade: null,
    page: null,
    pageCount: null,
    packUserId: ''
}

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
            return {...state}
        case 'EDIT-CARD':
            return {...state}
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

export const FetchCardsListTC = ({id}: { id: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await cardsListAPI.fetchCardsList({id})
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

export const AddNewCardTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await cardsListAPI.addNewCard(id)
        dispatch(AddNewCardAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const EditCardTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await cardsListAPI.editCard(id)
        dispatch(EditCardAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export type InitCardsListStateType = typeof initCardsListState
export type CardsListActionsType = FetchCardsListActionsType | DeleteCardActionsType | AddNewCardActionsType
    | EditCardActionsType
export type FetchCardsListActionsType = ReturnType<typeof FetchCardsListAC>
export type DeleteCardActionsType = ReturnType<typeof DeleteCardAC>
export type AddNewCardActionsType = ReturnType<typeof AddNewCardAC>
export type EditCardActionsType = ReturnType<typeof EditCardAC>