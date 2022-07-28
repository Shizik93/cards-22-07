import {AppActionsType, AppStoreType, AppThunk} from "../../../app/store";
import {authAPI, AuthLoginResponseType} from "../../../api/auth-api";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";



export const ProfileReducer = (state: ProfileStateType = initialState, action: AppActionsType): ProfileStateType => {
    switch (action.type) {
        case "SET-DATA-PROFILE-USER":
            return {
                ...state,
                email: action.data.email,
                avatar: action.data.avatar,
                nikName: action.data.name
            }
        case "DEL-DATA-PROFILE-USER":
            return {
                ...state,
                email: null,
                avatar: null,
                nikName: null
            }
        default:
            return state
    }
}
export const setProfileDataUserAC = (data: AuthLoginResponseType) => ({
    type: 'SET-DATA-PROFILE-USER',
    data
} as const)
export const delProfileDataUserAC = () => ({
    type: 'DEL-DATA-PROFILE-USER',
} as const)

export const AuthMeThunk = (): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    return authAPI.authMe()
        .then((res) => {
            dispatch(setProfileDataUserAC(res.data))
        })
        .catch((error)=>{
            dispatch(setAppErrorAC(error.response.data.error ? error.response.data.error: "some error"))
            dispatch(setAppStatusAC('failed'))
        })
}
export const UpdateUserThunk = (domainModel: UpdateDomainUserType): AppThunk => (dispatch,getState:()=>AppStoreType) => {
    dispatch(setAppStatusAC('loading'))
    const profile = getState().profile
    const apiModel: UpdateUserDataType = {
        name: profile.nikName,
        avatar: profile.avatar,
        ...domainModel
    }
    return authAPI.update(apiModel)
        .then((res) => {
            debugger
            dispatch(setProfileDataUserAC(res.data))
        })
        .catch((error)=>{
            debugger
            dispatch(setAppErrorAC(error.response.data.error ? error.response.data.error: "some error"))
            dispatch(setAppStatusAC('failed'))
        })
}

export const LogoutThunk = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.logout()
        .then((res) => {
            // dispatch(setLogoutUserAC())
            // dispatch(deleteAuthDataUserAC(false))
            dispatch(setAppStatusAC('succeded'))
            dispatch(delProfileDataUserAC())
        })
        .catch((error)=>{
            dispatch(setAppErrorAC(error.response.data.error ? error.response.data.error: "some error"))
            dispatch(setAppStatusAC('failed'))
        })

}
export type ProfileActionsType =
    | ReturnType<typeof setProfileDataUserAC>
    | ReturnType<typeof delProfileDataUserAC>

export type ProfileStateType = {
    email: string | null
    avatar: string | null | undefined
    nikName: string | null
}
const initialState: ProfileStateType = {
    email: null,
    avatar: null,
    nikName: "here migth be your nikName"
}
export type UpdateDomainUserType = {
    name?: string,
    avatar?: string
}
export type UpdateUserDataType ={
    name: string | null
    avatar: string | null | undefined
}