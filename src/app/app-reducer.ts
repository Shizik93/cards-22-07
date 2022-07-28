import {AppActionsType} from "./store";


export type AppStatusType = "idle" | "loading" | "succeded" | "failed"
export type initStateType = {
	isAuth: boolean,
	error: string | null
	status: AppStatusType
}
export type AppReducerActionsType =
	| ReturnType<typeof setAppStatusAC>
	| ReturnType<typeof setAppErrorAC>


export const initState:initStateType = {
	isAuth: false,
	error: null,
	status: "idle"
}


export const appReducer = (state:initStateType =initState, action: AppActionsType):initStateType => {
	switch (action.type) {
		case 'SET-APP-STATUS':
			return {...state,status: action.status}
		case "SET-APP-ERROR":
			return {...state,error: action.error}

		default:
			return state
	}
}
export const setAppStatusAC = (status: AppStatusType) => ({ type: 'SET-APP-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'SET-APP-ERROR', error} as const)