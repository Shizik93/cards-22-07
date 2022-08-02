import {AppActionsType, AppThunk} from "../../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {packsListAPI, ResponsePacksListType} from "../api-packsList/api-packsList";

export const initPacksListState = {
    cardPacks: [
        {
            _id: 'qw',
            // user_id: '',
            name: '',
            user_name: '',
            cardsCount: 0,
            // created: '',
            updated: '',
        },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0
}

export const packsListReducer = (state: initPacksListStateType = initPacksListState, action: AppActionsType): initPacksListStateType => {
    switch (action.type) {
        case 'CREATE-PACKSLIST':
            return {
                ...state,
                cardPacks: [...action.payload.cardPacks, ...state.cardPacks],
                cardPacksTotalCount: action.payload.cardPacksTotalCount,
                maxCardsCount: action.payload.maxCardsCount,
                minCardsCount: action.payload.minCardsCount,
                page: action.payload.page,
                pageCount: action.payload.pageCount
            }
        default:
            return state
    }
}
export const CreatePacksListActionsAC = (payload: ResponsePacksListType) =>
    ({
        type: 'CREATE-PACKSLIST', payload
    } as const)

export const CreatePacksListTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await packsListAPI.packsList()

        dispatch(CreatePacksListActionsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export type initPacksListStateType = typeof initPacksListState
export type PacksListActionsType = CreatePacksListActionsType
export type CreatePacksListActionsType = ReturnType<typeof CreatePacksListActionsAC>