import {registAPI, RegistParamsType} from "../api-regist/regist-api";
import {AppActionsType, AppThunk} from "../../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";

export const initRegistState = {
    isRegistered: false
}

export const registReducer = (state: RegistInitStateType = initRegistState, action: AppActionsType): RegistInitStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTERED':
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}

export const setIsRegisteredAC = (value: boolean) =>
    ({type: 'SET-IS-REGISTERED', value} as const)

export const registrationTC = (data: RegistParamsType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await registAPI.regist(data)
        dispatch(setIsRegisteredAC(true))
        dispatch(setAppStatusAC('succeded'))
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(error.message ? `${error.message}' more about concole error'` : 'Some error occurred'))

    }
    finally {
        dispatch(setAppStatusAC('failed'))
    }
}

export type RegistInitStateType = typeof initRegistState

export type RegistrActionsType = setIsRegisteredType
export type setIsRegisteredType = ReturnType<typeof setIsRegisteredAC>