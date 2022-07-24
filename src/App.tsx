import React from 'react';
import './App.css';
import {RoutesBlock} from "./components/RoutesBlock/RoutesBlock";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import logo from "./components/Pages/LoginPage/Lesson 1/Group 753.png";

export const App = () => {
  return (
    <div className="App">
        <Box sx={{flexGrow: 1}}>
            <AppBar style={{background:'#FCFCFC'}} color={'default'} position="static">
                <Toolbar style={{display:"flex",justifyContent:'space-between'}} >
                    <img alt={'logo'} src={logo}/>
                    <Button variant={'contained'} color="primary">Sign in</Button>
                </Toolbar>
            </AppBar>
        </Box>
      <RoutesBlock/>
    </div>
  );
}

