import {AppActionsType} from "../../../app/store";

export type RequestParamsStateType = {
    packName: string
    min: number
    max: number
    sortPacks: any
    page: number
    pageCount: number
    user_id: string
}

const RequestParamsState: RequestParamsStateType =
    {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: 0,
        page: 0,
        pageCount: 1,
        user_id: ''

    }


const SET_REQUEST_PARAMS = 'cards/SET-REQUEST'
const SET_MIN_MAX_CARDS = 'cards/SET_MIN_MAX_CARDS'

export const PageReducer = (state: RequestParamsStateType = RequestParamsState, action: AppActionsType): RequestParamsStateType => {
    switch (action.type) {
        case SET_REQUEST_PARAMS:
            return {
                ...state,
                packName: action.data.packName,
                min: action.data.minCardsCount,
                max: action.data.maxCardsCount,
                sortPacks:action.data.sortPacks,
                page: action.data.page,
                pageCount: action.data.pageCount,

            }
        case SET_MIN_MAX_CARDS:
            return {
                ...state,

            }


        default:
            return state
    }
}
export const setPageDataAC = ({...data}) => ({type: SET_REQUEST_PARAMS, data} as const)
export const setMinMaxDataAC = (data:{min:number, max: number}) => ({type: SET_MIN_MAX_CARDS, payload:{data}} as const)


// export const getCardsTC = (body: RequestBodyType): AppThunk => async (dispatch, getState) => {
//     try {
//         dispatch(setAppStatusAC('loading'))
//         const data = await packsListAPI.fetchPacksList(body)
//         // dispatch(setPageDataAC({...data.data}))
//         dispatch(FetchPacksListActionsAC({...data.data}))
//         dispatch(setAppStatusAC('succeded'))
//     } catch {
//         throw Error
//         dispatch(setAppStatusAC('failed'))
//     }
// }
// export const UpdateUserThunk = (domainModel: UpdateDomainUserType): AppThunk => async (dispatch, getState: () => AppStoreType) => {
//
//     const profile = getState().login
//     const apiModel: UpdateUserDataType = {
//         name: domainModel.name,
//         avatar: profile.avatar ===null?'':profile.avatar
//
//     }
//     try {
//         dispatch(setAppStatusAC('loading'))
//         const data = await profileApi.update(apiModel)
//         dispatch(setProfileDataUserAC({...data.data}))
//         dispatch(setAppStatusAC('succeded'))
//     }
//     catch {
//         throw Error
//         dispatch(setAppStatusAC('failed'))
//     }
// }

export type PageActionsType =
    | ReturnType<typeof setPageDataAC>
    | ReturnType<typeof setMinMaxDataAC>

