import {apiLogin} from "./api-login";
import {AppActionsType, AppThunk} from "../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";

type initialStateType =
    {
        isAuth: boolean
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
    isAuth: false,
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
export type UserDataType = {
    name: string;
    email?: string;
    avatar?: string;
};
export type LoginActionsType = logoutUserType | setLoginType | setErrorType | setUpdateUserDataType
export const loginReducer = (state: initialStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case "SET-LOGIN":
        case 'LOGOUT-USER': {
            return {...state, ...action.data}
        }
        case "SET-ERROR": {
            return {...state, error: action.error}
        }
        case 'SET-UPDATE-USER-DATA': {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }

}
const logoutUserAC = () => {
    return {
        type: 'LOGOUT-USER',
        data: initialState
    } as const
}
type logoutUserType = ReturnType<typeof logoutUserAC>

const setLoginAC = (data: initialStateType) => {
    return {
        type: 'SET-LOGIN',
        data
    } as const
}
type setLoginType = ReturnType<typeof setLoginAC>


export const setLoginTC = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await apiLogin.setLogin(email, password, rememberMe)
        dispatch(setLoginAC({...data.data, isAuth: true}))
        dispatch(setAppStatusAC('succeded'))
    } catch(err:any) {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(err.response.data.error))

    }
}
export const authMeTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await apiLogin.me()
        dispatch(setLoginAC({...data.data, isAuth: true}))
        dispatch(setAppStatusAC('succeded'))
    } catch(err:any) {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(err.response.data.error))

    }
}
export const logOutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await apiLogin.logOut()
        dispatch(logoutUserAC())
        dispatch(setAppStatusAC('succeded'))
    } catch(err:any) {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(err.response.data.error))
    }
}
export const setError = (error: string) => {
    return {
        type: 'SET-ERROR',
        error
    } as const
}
type setErrorType = ReturnType<typeof setError>

const setUpdateUserData = (payload: UserDataType) => {
    return {
        type: 'SET-UPDATE-USER-DATA',
        payload
    } as const
}
type setUpdateUserDataType = ReturnType<typeof setUpdateUserData>

export const UpdateUserTC = (avatar: string | ArrayBuffer | null, name: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await apiLogin.updateUser({name, avatar})
        dispatch(setUpdateUserData({
                name: data.data.updatedUser.name,
                avatar: data.data.updatedUser.avatar,
                email: data.data.updatedUser.email,
            }
        ))
        dispatch(setAppStatusAC('succeded'))

    } catch {
        dispatch(setAppStatusAC('failed'))
        throw Error
    }
}