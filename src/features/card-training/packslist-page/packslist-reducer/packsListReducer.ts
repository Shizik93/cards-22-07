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
    pageCount: 5,
    packName: '',
    min: 0,
    max: 110,
    sortPacks: 0,
    user_id: ''
}
const SET_MIN_MAX_CARDS = 'cards/SET_MIN_MAX_CARDS'
const SET_PACKNAME = 'cards/SET_SET_PACKNAME'
const SET_PAGE_COUNT = 'cards/SET_PAGE_COUNT'
const SET_CURRENT_PAGE = 'cards/SET_CURRENT_PAGE'
const SET_USER_ID = 'cards/SET_USER_ID'

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
                // pageCount: action.payload.pageCount
            }
        case 'DELETE-CARDSPACK':
            return {...state, cardPacks: state.cardPacks.filter(tl => tl._id !== action.payload)}
        // case 'ADD-NEW-CARDSPACK':
        //     return {...state}
        // case 'EDIT-CARDSPACK':
        //     return {...state}
        case SET_MIN_MAX_CARDS:
            return {...state,min: action.payload.data.min, max:action.payload.data.max }
        case SET_PACKNAME:
            return {...state,packName: action.payload.data.packName }
        case SET_PAGE_COUNT:
            return {...state,pageCount: action.payload.data.pageCount}
        case SET_CURRENT_PAGE:
            return {...state,page:action.payload.data.page}
        case SET_USER_ID:
            return {...state,user_id: action.payload.data.user_id}

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
export const setMinMaxDataAC = (data:{min:number, max: number}) => ({type: SET_MIN_MAX_CARDS, payload:{data}} as const)
export const setPackNameDataAC = (data:{packName:string}) => ({type: SET_PACKNAME, payload:{data}} as const)
export const setPageCountAC = (data:{pageCount:number}) => ({type: SET_PAGE_COUNT, payload:{data}} as const)
export const setCurrentPageAC = (data:{page:number}) => ({type: SET_CURRENT_PAGE, payload:{data}} as const)
export const setUserIdAC = (data:{user_id:string}) => ({type: SET_USER_ID, payload:{data}} as const)


export const FetchCardsPackListTC = (/*body:RequestBodyType*/): AppThunk => async (dispatch,getState) => {
    let state = getState().packsList
    let requestData:RequestBodyType = {
        packName: state.packName,
        min: state.min,
        max: state.max,
        sortPacks: state.sortPacks,
        page: state.page,
        pageCount: state.pageCount,
        user_id: state.user_id
    }
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.fetchPacksList(requestData)
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
    | ReturnType<typeof setMinMaxDataAC>
    | ReturnType<typeof setPackNameDataAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUserIdAC>
export type FetchPacksListActionsType = ReturnType<typeof FetchPacksListActionsAC>
export type DeleteCardsPackActionsType = ReturnType<typeof DeletePacksListActionsAC>
export type AddNewCardsPackActionsType = ReturnType<typeof AddNewCardsPacksActionsAC>
export type EditCardsPackActionsType = ReturnType<typeof EditCardsPackActionsAC>