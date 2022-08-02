import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import {appReducer, AppReducerActionsType} from "./app-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ProfileActionsType, ProfileReducer} from "../features/auth/profile-page/profile-reducer";
import {RegistrActionsType, registReducer} from "../features/auth/regist-page/registReducers/regist-reducer";
import {LoginActionsType, loginReducer} from "../features/auth/login-page/login-reducer";
import {
    PacksListActionsType,
    packsListReducer
} from "../features/card-training/packslist-page/packsListReducer/packsListReducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    profile: ProfileReducer,
    registration: registReducer,
    packsList: packsListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof store.getState>
export type AppActionsType = ProfileActionsType | AppReducerActionsType | LoginActionsType | RegistrActionsType
    | PacksListActionsType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStoreType,
    unknown,
    AppActionsType>
// @ts-ignore
window.store = store