import {apiLogin} from "./api-login";
import {Dispatch} from "redux";

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

type ActionsType = logoutUserType | setLoginType | setErrorType
export const loginReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-LOGIN":
        case 'LOGOUT-USER': {
            return {...state, ...action.data}
        }
        case "SET-ERROR":{
            return {...state,error:action.error}
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


export const setLoginTC = (email: string, password: string, rememberMe: boolean) => async (dispath: Dispatch) => {
    try {
        const data = await apiLogin.setLogin(email, password, rememberMe)
        dispath(setLoginAC({...data.data, isAuth: true}))
    } catch {
        throw Error
    }
}
export const authMeTC = () => async (dispath: Dispatch) => {
    try {
        const data = await apiLogin.me()
        dispath(setLoginAC({...data.data.data, isAuth: true}))
    } catch {
        throw Error
    }
}
export const logOutTC = () => async (dispatch: Dispatch) => {
    try {
        await apiLogin.logOut()
        dispatch(logoutUserAC())
    } catch {
        throw Error
    }
}
export const setError = (error: string) => {
    return {
        type: 'SET-ERROR',
        error
    } as const
}
type setErrorType = ReturnType<typeof setError>

