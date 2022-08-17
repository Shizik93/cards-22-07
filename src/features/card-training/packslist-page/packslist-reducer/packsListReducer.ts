import {AppActionsType, AppThunk} from "../../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {
    CardPackItemsType,
    packsListAPI,
    RequestBodyType,
    ResponseCardsPackListType,
} from "../api-packslist/api-packsList";

// const obj = {
//     packs: [] as Array<string>,
//     bla: {
//
//     } as {title: string, age: number},
// }

// state
export const initPacksListState = {
    cardPacks: [] as CardPackItemsType[],
    newCardsPack: {} as CardPackItemsType,
    updatedCardsPack: {} as CardPackItemsType,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    packName: '',
    min: 0,
    max: 110,
    sortPacks: 1 + '',
    user_id: '',
    token: '',
    tokenDeathTime: 0,
    RequestBody: {} as RequestBodyType
}

//const types
const FETCH_PACKSLIST = 'packList/FETCH_PACKSLIST'
const SET_MIN_MAX_CARDS = 'packList/SET_MIN_MAX_CARDS'
const SET_PACKNAME = 'packList/SET_SET_PACKNAME'
const SET_PAGE_COUNT = 'packList/SET_PAGE_COUNT'
const SET_CURRENT_PAGE = 'packList/SET_CURRENT_PAGE'
const SET_USER_ID = 'packList/SET_USER_ID'
const SET_SORT_COLUMN = 'packList/SET_SORT_COLUMN'

//reducer
export const packsListReducer = (state: InitPacksListStateType = initPacksListState, action: AppActionsType): InitPacksListStateType => {
    switch (action.type) {
        case FETCH_PACKSLIST:
            return {
                ...state,
                cardPacks: [...action.payload.cardPacks],
                cardPacksTotalCount: action.payload.cardPacksTotalCount,
                maxCardsCount: action.payload.maxCardsCount,
                minCardsCount: action.payload.minCardsCount,
                pageCount: action.payload.pageCount
            }
        case SET_MIN_MAX_CARDS:
            return {...state, min: action.payload.data.min, max: action.payload.data.max, page: 1}
        case SET_PACKNAME:
            return {...state, packName: action.payload.data.packName, page: 1}
        case SET_PAGE_COUNT:
            return {...state, pageCount: action.payload.data.pageCount, page: 1}
        case SET_CURRENT_PAGE:
            return {...state, page: action.payload.data.page}
        case SET_USER_ID:
            return {...state, user_id: action.payload.data.user_id}
        case SET_SORT_COLUMN:
            return {...state, sortPacks: action.payload.data.sortPacks.value + action.payload.data.sortPacks.name}
        // case 'DELETE-CARDSPACK':
        //     return {...state, cardPacks: state.cardPacks.filter(tl => tl._id !== action.payload)}
        // case 'ADD-NEW-CARDSPACK':
        //     return {
        //         ...state, cardPacks: [{...action.payload.newCardsPack}, ...state.cardPacks],
        //         token: action.payload.token, tokenDeathTime: action.payload.tokenDeathTime
        //     }
        // case 'EDIT-CARDSPACK':
        //     return {
        //         ...state, cardPacks: [{...action.payload.updatedCardsPack}, ...state.cardPacks],
        //         token: action.payload.token, tokenDeathTime: action.payload.tokenDeathTime
        //     }
        default:
            return state
    }
}

//action creators
export const fetchPacksListActionsAC = (payload: ResponseCardsPackListType) => ({type: FETCH_PACKSLIST, payload} as const)
export const setMinMaxDataAC = (data: { min: number, max: number }) => ({type: SET_MIN_MAX_CARDS, payload: {data}} as const)
export const setPackNameDataAC = (data: { packName: string }) => ({type: SET_PACKNAME, payload: {data}} as const)
export const setPageCountAC = (data: { pageCount: number }) => ({type: SET_PAGE_COUNT, payload: {data}} as const)
export const setCurrentPageAC = (data: { page: number }) => ({type: SET_CURRENT_PAGE, payload: {data}} as const)
export const setUserIdAC = (data: { user_id: string }) => ({type: SET_USER_ID, payload: {data}} as const)
export const setSortColumnAC = (data: { sortPacks: { value: number, name: string } }) => ({type: SET_SORT_COLUMN, payload: {data}} as const)
// export const deletePacksListActionsAC = (payload: string) =>
//     ({
//         type: 'DELETE-CARDSPACK', payload
//     } as const)
// export const addNewCardsPacksActionsAC = (payload: ResponseAddNewCardsPackType) =>
//     ({
//         type: 'ADD-NEW-CARDSPACK', payload
//     } as const)
// export const editCardsPackActionsAC = (payload: ResponseEditCardsPackType) =>
//     ({
//         type: 'EDIT-CARDSPACK', payload
//     } as const)

// thunk actions
export const fetchCardsPackListTC = (/*body:RequestBodyType*/): AppThunk => async (dispatch, getState) => {
    let state = getState().packsList
    let requestData: RequestBodyType = {
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
        dispatch(fetchCardsPackListTC())
        // dispatch(deletePacksListActionsAC(id))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const addNewPackTC = (title: string, privatePack: boolean): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.addNewCardsPack(title, privatePack)
        dispatch(fetchCardsPackListTC())
        // dispatch(addNewCardsPacksActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export const editCardsPackTC = (id: string, newTitle: string, privatePack: boolean): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.editCardsPack(id, newTitle, privatePack)
        dispatch(fetchCardsPackListTC())
        // dispatch(editCardsPackActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

// types
export type InitPacksListStateType = typeof initPacksListState
export type PacksListActionsType =
    | FetchPacksListActionsType
    | ReturnType<typeof setMinMaxDataAC>
    | ReturnType<typeof setPackNameDataAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUserIdAC>
    | ReturnType<typeof setSortColumnAC>
// | DeleteCardsPackActionsType
// | AddNewCardsPackActionsType
// | EditCardsPackActionsType

export type FetchPacksListActionsType = ReturnType<typeof fetchPacksListActionsAC>
// export type DeleteCardsPackActionsType = ReturnType<typeof deletePacksListActionsAC>
// export type AddNewCardsPackActionsType = ReturnType<typeof addNewCardsPacksActionsAC>
// export type EditCardsPackActionsType = ReturnType<typeof editCardsPackActionsAC>
