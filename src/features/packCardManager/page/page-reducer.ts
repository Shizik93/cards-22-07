import {AppActionsType, AppThunk} from "../../../app/store";
import {setAppStatusAC} from "../../../app/app-reducer";
import {pageAPI} from "../../auth/profile-page/profile-api";
type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
export type PagesStateType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

const pagesInitialState:PagesStateType =
{
    cardPacks:[{
        _id: '',
        user_id: '',
        name: '',
        cardsCount: 0,
        created: '',
        updated: ''
    }],
    page: 1,
    pageCount:4,
    cardPacksTotalCount: 0,
    minCardsCount:0,
    maxCardsCount:0,

}

const SET_PAGE = 'cards/SET-DATA-PAGE'
export const PageReducer = (state: PagesStateType = pagesInitialState, action: AppActionsType): PagesStateType => {
    switch (action.type) {
        case SET_PAGE:
            // let copy = {...state}
            // copy = action.data
        return {...state,
            cardPacks:action.data.cardPacks,
            page:action.data.page,
            pageCount:action.data.pageCount,
            cardPacksTotalCount: action.data.cardPacksTotalCount,
            minCardsCount: action.data.minCardsCount,
            maxCardsCount: action.data.maxCardsCount,
        }


        default:
            return state
    }
}
export const setPageDataAC = ({...data}) => ({type: SET_PAGE, data} as const)
export type RequestBodyType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: any
    page?: number
    pageCount?: number
    user_id?: string
}

export const getCardsTC = (body: RequestBodyType): AppThunk => async (dispatch,getState) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await pageAPI.getCards(body)
        dispatch(setPageDataAC({...data.data}))
        dispatch(setAppStatusAC('succeded'))
    } catch {
        throw Error
        dispatch(setAppStatusAC('failed'))
    }
}
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

