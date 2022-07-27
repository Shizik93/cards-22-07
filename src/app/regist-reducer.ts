import {Dispatch} from "redux";
import {registAPI, RegistParamsType} from "../api/regist-api/regist-api";
// import {setAppErrorAC, setAppStatusAC} from "./AppReducer";

export const initRegistState = {
	isRegistered: false
}

export const registReducer = (state: RegistInitStateType = initRegistState, action: ActionsType): RegistInitStateType => {
	switch (action.type) {
		case 'SET-IS-REGISTERED':
			return {...state, isRegistered: action.value}
		default:
			return state
	}
}

export const setIsRegisteredAC = (value: boolean) =>
	({type: 'SET-IS-REGISTERED', value} as const)

export const registrationTC = (data: RegistParamsType) => async (dispatch: Dispatch) => {
	try {
		// dispatch(setAppStatusAC('loading'))
		await registAPI.regist(data)
		dispatch(setIsRegisteredAC(true))
		// dispatch(setAppStatusAC('succeeded'))
	} catch (e: any) {
		// dispatch(setAppStatusAC('failed'))
		// dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
		const error = e.response? e.response.data.error: (e.message+ ', more details in the console')
		console.log('Error:', error)
	}
}

export type RegistInitStateType = typeof initRegistState

type ActionsType = setIsRegisteredType
export type setIsRegisteredType = ReturnType<typeof setIsRegisteredAC>