import React, {useEffect} from 'react';
import './App.css';
import {RoutesBlock} from "../common/components/RoutesBlock/RoutesBlock";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import logo from "../assets/img/logo_incubator.png";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./store";
import {authMeTC, logOutTC} from "../features/auth/login-page/login-reducer";

export const  App = () => {
    const dispatch=useDispatch()
    const isAuth=useSelector<AppStoreType>(state => state.login.isAuth)
    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])
  return (
    <div className="App">
        <Box sx={{flexGrow: 1}}>
            <AppBar style={{background:'#FCFCFC'}} color={'default'} position="static">
                <Toolbar style={{display:"flex",justifyContent:'space-between'}} >
                    <img alt={'logo'} src={logo}/>
                    {isAuth
                        ?<Button onClick={()=>{dispatch(logOutTC())}} variant={'contained'} color="primary">Sign Out</Button>
                        :<Button variant={'contained'} color="primary">Sign in</Button>}

                </Toolbar>
            </AppBar>
        </Box>
      <RoutesBlock/>
    </div>
  );
}

