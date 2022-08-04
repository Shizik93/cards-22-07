import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "../error-page/Error404";
import {NewPass} from "../../../features/auth/new-password-page/NewPass";
import {Profile} from "../../../features/auth/profile-page/Profile";
import {Recovery} from "../../../features/auth/recovery-page/Recovery";
import {Registration} from "../../../features/auth/regist-page/Regist";
import {Login} from "../../../features/auth/login-page/Login";
import {PaginatorContainer} from "../../../features/page/PaginatorContainer";


export const PATH = {
    LOGINPAGE: '/login',
    NEWPASSPAGE: '/new_pass',
    PROFILEPAGE: '/profile',
    RECOVERYPAGE: '/recovery',
    REGISTRATIONPAGE: '/regist',
    CARDS: '/cards',

}

export const RoutesBlock = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGINPAGE}/>}/>
                <Route path={PATH.LOGINPAGE} element={<Login/>}/>
                <Route path={PATH.NEWPASSPAGE} element={<NewPass/>}/>
                <Route path={PATH.PROFILEPAGE} element={<Profile/>}/>
                <Route path={PATH.RECOVERYPAGE} element={<Recovery/>}/>
                <Route path={PATH.REGISTRATIONPAGE} element={<Registration/>}/>
                <Route path={PATH.CARDS} element={<PaginatorContainer/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </>
    )
}
