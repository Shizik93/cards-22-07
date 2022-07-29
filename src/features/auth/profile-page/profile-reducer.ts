import {AppActionsType, AppStoreType, AppThunk} from "../../../app/store";
import {profileApi} from "./profile-api";
import {setAppStatusAC} from "../../../app/app-reducer";


export type initialStateType = {
        _id: string | null;
        email: string | null;
        name: string | null;
        avatar?: string | null;
        publicCardPacksCount: number | null;
        created: Date | null;
        updated: Date | null;
        isAdmin: boolean;
        verified: boolean;
        rememberMe: boolean;
        error?: string | null;
    }
const initialState = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: null,

}
export const ProfileReducer = (state: initialStateType = initialState, action: AppActionsType): initialStateType => {
    switch (action.type) {
        case "SET-DATA-PROFILE-USER":
            debugger
            return {
                ...state,
                email: action.data.email,
                avatar: action.data.avatar,
                name: action.data.name
            }
        case "DEL-DATA-PROFILE-USER":
            return {
                ...state,
                email: null,
                avatar: null,
            }
        default:
            return state
    }
}
export const setProfileDataUserAC = (data: initialStateType) => ({
    type: 'SET-DATA-PROFILE-USER',
    data
} as const)
export const delProfileDataUserAC = () => ({
    type: 'DEL-DATA-PROFILE-USER',
} as const)

export const AuthMeThunk = (): AppThunk => async (dispatch) => {
   debugger
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await profileApi.me()
        dispatch(setProfileDataUserAC({...data.data}))
        dispatch(setAppStatusAC('succeded'))
    } catch {
        throw Error
        dispatch(setAppStatusAC('failed'))
    }
}
export const UpdateUserThunk = (domainModel: UpdateDomainUserType): AppThunk => async (dispatch, getState: () => AppStoreType) => {
        debugger
    const profile = getState().login
        const apiModel: UpdateUserDataType = {
            name: domainModel.name,
            avatar: profile.avatar ===null?'':profile.avatar

        }
        try {
            dispatch(setAppStatusAC('loading'))
            const data = await profileApi.update(apiModel)
            dispatch(setProfileDataUserAC({...data.data}))
            dispatch(setAppStatusAC('succeded'))
        }
        catch {
            throw Error
            dispatch(setAppStatusAC('failed'))
        }
    }

    export type ProfileActionsType =
        | ReturnType<typeof setProfileDataUserAC>
        | ReturnType<typeof delProfileDataUserAC>

    export type ProfileStateType = {
        email: string | null
        avatar: string | null | undefined
    }
    export type UpdateDomainUserType = {
        name?: string,
        avatar?: string
    }
    export type UpdateUserDataType = {
        name: string | null | undefined
        avatar: string | null | undefined
    }

