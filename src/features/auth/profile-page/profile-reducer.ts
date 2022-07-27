import {AppActionsType, AppThunk} from "../../app/store";
import {authAPI, AuthLoginResponseType} from "../../api/auth-api";

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
    nikName: null
}

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

// export const AuthMeThunk = (): AppThunk => (dispatch) => {
//     // dispatch(setAppStatusAC('loading'))
//     return authAPI.authMe()
//         .then((res) => {
//             dispatch(setAuthDataUserAC(res.data, true))
//             dispatch(setProfileDataUserAC(res.data))
//         })
//         .catch((error)=>{
//             dispatch(setErrorDataUserAC(error.response.data.error, false))
//         })
// }
