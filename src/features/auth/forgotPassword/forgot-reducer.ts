import {AppThunk} from "../../../app/store";
import {ApiForgot} from "./api-forgot";
import {setAppStatusAC} from "../../../app/app-reducer";

type initialStateType = {
    email: string
    newPass:boolean
}

const initialState = {
    email:'',
    newPass:false,
}
export type forgotReducerActionsType=setRecoveryEmailType|setNewPasswordType
export const forgotReducer = (state: initialStateType = initialState, action: forgotReducerActionsType) => {
    switch (action.type) {
        case 'SET-RECOVERY-EMAIL': {
            return {...state,email:action.email}
        }
        case "SET-NEW-PASSWORD":{
            return {...state,newPass:action.value}
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
export const setNewPasswordAC=(value:boolean)=>{
    return{
        type:'SET-NEW-PASSWORD',
        value

    } as const
}
export type setNewPasswordType=ReturnType<typeof setNewPasswordAC>

export const setNewPasswordTC=(tockenId:string,password:string):AppThunk=>async (dispatch)=>{
    dispatch(setAppStatusAC('loading'))
    try{
        await ApiForgot.setNewPassword(tockenId,password)
        dispatch(setNewPasswordAC(true))
        dispatch(setAppStatusAC('succeded'))
    }
    catch {
        dispatch(setAppStatusAC('failed'))
        throw Error
    }
}