import React, {useEffect} from 'react';
import './App.css';
import {PATH, RoutesBlock} from "../common/components/RoutesBlock/RoutesBlock";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import logo from "../assets/img/logo_incubator.png";
import {useSelector} from "react-redux";
import {AppStoreType} from "./store";
import {authMeTC, logOutTC} from "../features/auth/login-page/login-reducer";
import {useAppDispatch, useAppSelector} from "./hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {Preloader} from "../common/components/Preloader/Preloader";

export const App = () => {
    const nickName = useAppSelector(state => state.login.name)
    const avatar = useAppSelector(state => state.login.avatar)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuth = useSelector<AppStoreType>(state => state.login.isAuth)
    const status = useAppSelector(state => state.app.status)
    const routeChange = () => {
        navigate(PATH.LOGINPAGE)
    }
    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])


    return (

        <div className="App">
            {status === 'loading' && <Preloader/>}
            <Box sx={{flexGrow: 1}}>
                <AppBar style={{background: '#FCFCFC'}} color={'default'} position="static">
                    <Toolbar style={{justifyContent: 'center'}}>
                        <div style={{display: 'flex', width: '80%', justifyContent: 'space-between'}}>
                            <img alt={'logo'} src={logo}/>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                {isAuth
                                    ? <div className={'name'}>{nickName}</div>


                                    : <Button onClick={routeChange} variant={'contained'}
                                              color="primary">Sign in</Button>}
                                {avatar && <img className={'avatar'} src={avatar}/>}</div>

                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
            <RoutesBlock/>
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
        </div>
    );
}

