import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./app-reducer";
import thunk from "redux-thunk";
import {loginReducer} from "../features/auth/login-page/login-reducer";

const reducers = combineReducers({
	app: appReducer,
	login:loginReducer,

})

export const store = createStore(reducers,applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>

//@ts-ignore

window.store = store