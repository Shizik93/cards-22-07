import {AppThunk} from "../../../app/store";
import {ApiForgot} from "./api-forgot";
import {setAppStatusAC} from "../../../app/app-reducer";

type initialStateType = {
    email: string
}

const initialState = {
    email:''
}
type forgotReducerActionsType=setRecoveryEmailType
export const forgotReducer = (state: initialStateType = initialState, action: forgotReducerActionsType) => {
    switch (action.type) {
        case 'SET-RECOVERY-EMAIL': {
            return {...state,email:action.email}
        }
        default: {
            return state
        }
    }

}

export const setRecoveryEmailAC=(email:string)=>{
    return{
        type:'SET-RECOVERY-EMAIL',
        email
    } as const
}
export type setRecoveryEmailType=ReturnType<typeof setRecoveryEmailAC>

export const setRecoveryEmailTC=(email:string):AppThunk=>async (dispatch)=>{
    dispatch(setAppStatusAC('loading'))
    try {
        await ApiForgot.forgotPassword(email)
        dispatch(setRecoveryEmailAC(email))
        dispatch(setAppStatusAC('succeded'))
    }
    catch {
        dispatch(setAppStatusAC('failed'))
        throw Error
    }

}