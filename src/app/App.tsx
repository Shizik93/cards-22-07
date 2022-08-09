import React, {useEffect} from 'react';
import './App.css';
import {PATH, RoutesBlock} from "../common/components/RoutesBlock/RoutesBlock";
import {Button} from "@mui/material";
import {authMeTC} from "../features/auth/login-page/login-reducer";
import {useAppDispatch, useAppSelector} from "./hooks";
import {useNavigate} from "react-router-dom";
import {Preloader} from "../common/components/Preloader/Preloader";
import {ResponsiveAppBar} from "../common/components/app-bar/AppBar";
import {ErrorSnackbar} from "../common/components/ErrorSnackBar/ErrorSnackBar";


export const App = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])


    return (

        <div className="App">
            {status === 'loading' && <Preloader/>}
            <ResponsiveAppBar/>
            <RoutesBlock/>
            <NavigateButtons/>
            <ErrorSnackbar/>
        </div>
    );
}














const NavigateButtons=()=>{
    const navigate = useNavigate()
    return(
        <div>
            <Button onClick={() => {    // Блок кнопок для переключения между страницами
                navigate(PATH.LOGINPAGE)
            }} variant={'contained'}
                    color="primary">Login page</Button>
            <Button onClick={() => {
                navigate(PATH.PACKSLISTPAGE)
            }} variant={'contained'}
                    color="primary">Packs list</Button>
            <Button onClick={() => {
                navigate(PATH.CARDSLISTPAGE)
            }} variant={'contained'}
                    color="primary">Cards list</Button>
            <Button onClick={() => {
                navigate(PATH.PROFILEPAGE)
            }} variant={'contained'}
                    color="primary">Profile page</Button>
            <Button onClick={() => {
                navigate(PATH.EMPTYCARDSLISTPAGE)
            }} variant={'contained'}
                    color="primary">Empty Cards List</Button>
        </div>
    )
}

