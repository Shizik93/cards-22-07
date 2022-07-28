import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'
import {appReducer, AppReducerActionsType} from "./app-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {ProfileActionsType, ProfileReducer} from "../features/auth/profile-page/profile-reducer";
import {RegistrActionsType, registReducer, setIsRegisteredType} from "./regist-reducer";
import {LoginActionsType, loginReducer} from "../features/auth/login-page/login-reducer";

const reducers = combineReducers({
	app: appReducer,
	login:loginReducer,
	profile: ProfileReducer,
	registration: registReducer,
})

export const store = createStore(reducers,applyMiddleware(thunk))
export type AppStoreType = ReturnType<typeof store.getState>
export type AppActionsType = ProfileActionsType | AppReducerActionsType|LoginActionsType|RegistrActionsType
//@ts-ignore
export type AppDispatch = ThunkDispatch<AppRootState,unknown,AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppStoreType,
	unknown,
	AppActionsType
	>
// @ts-ignore
window.store = store