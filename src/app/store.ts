import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {ProfileActionsType, ProfileReducer} from "../features/auth/profile-page/profile-reducer";

const reducers = combineReducers({
	app: appReducer,
	profile: ProfileReducer
})

export const store = createStore(reducers,applyMiddleware(thunk))
export type AppStoreType = ReturnType<typeof store.getState>
export type AppActionsType = ProfileActionsType | AppReducerActionsType
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