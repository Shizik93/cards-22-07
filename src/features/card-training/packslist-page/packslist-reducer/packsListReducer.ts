import {AppActionsType, AppThunk} from "../../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {
    CardPackItemsType,
    packsListAPI,
    ResponseEditCardsPackType,
    ResponseCardsPackListType, RequestBodyType, ResponseAddNewCardsPackType
} from "../api-packslist/api-packsList";

// const obj = {
//     packs: [] as Array<string>,
//     bla: {
//
//     } as {title: string, age: number},
// }

export const initPacksListState = {
    cardPacks: [] as CardPackItemsType[],
    newCardsPack: {} as CardPackItemsType,
    updatedCardsPack: {} as CardPackItemsType,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0,
    RequestBody: {} as RequestBodyType
}

export const packsListReducer = (state: InitPacksListStateType = initPacksListState, action: AppActionsType): InitPacksListStateType => {
    switch (action.type) {
        case 'FETCH-PACKSLIST':
            return {
                ...state,
                cardPacks: [...action.payload.cardPacks],
                cardPacksTotalCount: action.payload.cardPacksTotalCount,
                maxCardsCount: action.payload.maxCardsCount,
                minCardsCount: action.payload.minCardsCount,
                page: action.payload.page,
                pageCount: action.payload.pageCount
            }
        case 'DELETE-CARDSPACK':
            return {...state, cardPacks: state.cardPacks.filter(tl => tl._id !== action.payload)}
        case 'ADD-NEW-CARDSPACK':
            return {
                ...state, cardPacks: [{...action.payload.newCardsPack}, ...state.cardPacks],
                token: action.payload.token, tokenDeathTime: action.payload.tokenDeathTime
            }
        case 'EDIT-CARDSPACK':
            return {
                ...state, cardPacks: [{...action.payload.updatedCardsPack}, ...state.cardPacks],
                token: action.payload.token, tokenDeathTime: action.payload.tokenDeathTime
            }
        default:
            return state
    }
}
export const fetchPacksListActionsAC = (payload: ResponseCardsPackListType) =>
    ({
        type: 'FETCH-PACKSLIST', payload
    } as const)
export const deletePacksListActionsAC = (payload: string) =>
    ({
        type: 'DELETE-CARDSPACK', payload
    } as const)
export const addNewCardsPacksActionsAC = (payload: ResponseAddNewCardsPackType) =>
    ({
        type: 'ADD-NEW-CARDSPACK', payload
    } as const)
export const editCardsPackActionsAC = (payload: ResponseEditCardsPackType) =>
    ({
        type: 'EDIT-CARDSPACK', payload
    } as const)

export const fetchCardsPackListTC = (body: RequestBodyType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.fetchPacksList(body)
        dispatch(fetchPacksListActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const deleteCardsPackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await packsListAPI.deleteCardsPack(id)
        dispatch(deletePacksListActionsAC(id))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const addNewPackTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.addNewCardsPack()
        dispatch(addNewCardsPacksActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const editCardsPackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.editCardsPack(id)
        dispatch(editCardsPackActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export type InitPacksListStateType = typeof initPacksListState
export type PacksListActionsType = FetchPacksListActionsType | DeleteCardsPackActionsType | AddNewCardsPackActionsType
    | EditCardsPackActionsType
export type FetchPacksListActionsType = ReturnType<typeof fetchPacksListActionsAC>
export type DeleteCardsPackActionsType = ReturnType<typeof deletePacksListActionsAC>
export type AddNewCardsPackActionsType = ReturnType<typeof addNewCardsPacksActionsAC>
export type EditCardsPackActionsType = ReturnType<typeof editCardsPackActionsAC>