import React, {useEffect} from 'react';
import './App.css';
import {PATH, RoutesBlock} from "../common/components/RoutesBlock/RoutesBlock";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import logo from "../assets/img/logo_incubator.png";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./store";
import {authMeTC, logOutTC} from "../features/auth/login-page/login-reducer";
import {useAppDispatch} from "./hooks";
import {Navigate, useNavigate} from "react-router-dom";

export const  App = () => {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const isAuth=useSelector<AppStoreType>(state => state.login.isAuth)
    const routeChange=()=>{
        navigate(PATH.LOGINPAGE)
    }

        useEffect(() => {
        // @ts-ignore
        dispatch(authMeTC())
    }, [dispatch])
  return (
    <div className="App">
        <Box sx={{flexGrow: 1}}>
            <AppBar style={{background:'#FCFCFC'}} color={'default'} position="static">
                <Toolbar style={{display:"flex",justifyContent:'space-between'}} >
                    <img alt={'logo'} src={logo}/>
                    {isAuth
                        ?<Button onClick={()=>{
                            dispatch(logOutTC())}} variant={'contained'} color="primary">Sign Out</Button>
                        :<Button onClick={routeChange} variant={'contained'} color="primary">Sign in</Button>}

                </Toolbar>
            </AppBar>
        </Box>
      <RoutesBlock/>
    </div>
  );
}

