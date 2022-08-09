import {AppActionsType, AppThunk} from "../../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {
    CardPackItemsType,
    packsListAPI,
    ResponseAddNewCardsPackType,
    ResponseEditCardsPackType,
    ResponseCardsPackListType, RequestBodyType
} from "../api-packslist/api-packsList";

// const obj = {
//     packs: [] as Array<string>,
//     bla: {
//
//     } as {title: string, age: number},
// }

export const initPacksListState = {
    cardPacks: [
    ] as CardPackItemsType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 5
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
        // case 'ADD-NEW-CARDSPACK':
        //     return {...state}
        // case 'EDIT-CARDSPACK':
        //     return {...state}
        default:
            return state
    }
}
export const FetchPacksListActionsAC = (payload: ResponseCardsPackListType) =>
    ({
        type: 'FETCH-PACKSLIST', payload
    } as const)
export const DeletePacksListActionsAC = (payload: string) =>
    ({
        type: 'DELETE-CARDSPACK', payload
    } as const)
export const AddNewCardsPacksActionsAC = (payload: ResponseAddNewCardsPackType) =>
    ({
        type: 'ADD-NEW-CARDSPACK', payload
    } as const)
export const EditCardsPackActionsAC = (payload: ResponseEditCardsPackType) =>
    ({
        type: 'EDIT-CARDSPACK', payload
    } as const)

export const FetchCardsPackListTC = (body:RequestBodyType): AppThunk => async (dispatch,getState) => {
    let state = getState().packsList
    let requestData:RequestBodyType = {
        packName: body.packName,
        min: body.min,
        max: body.max,
        sortPacks: body.sortPacks,
        page: state.page,
        pageCount: state.pageCount,
        user_id: body.user_id
    }
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.fetchPacksList(body)
        dispatch(FetchPacksListActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const DeleteCardsPackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await packsListAPI.deleteCardsPack(id)
        dispatch(DeletePacksListActionsAC(id))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const AddNewPackTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.addNewCardsPack()
        dispatch(AddNewCardsPacksActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const EditCardsPackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.editCardsPack(id)
        dispatch(EditCardsPackActionsAC(res.data))
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
export type FetchPacksListActionsType = ReturnType<typeof FetchPacksListActionsAC>
export type DeleteCardsPackActionsType = ReturnType<typeof DeletePacksListActionsAC>
export type AddNewCardsPackActionsType = ReturnType<typeof AddNewCardsPacksActionsAC>
export type EditCardsPackActionsType = ReturnType<typeof EditCardsPackActionsAC>
