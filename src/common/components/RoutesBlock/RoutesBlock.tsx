import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "../error-page/Error404";
import {NewPass} from "../../../features/auth/forgotPassword/new-password-page/NewPass";
import {Profile} from "../../../features/auth/profile-page/Profile";
import {Recovery} from "../../../features/auth/forgotPassword/recovery-page/Recovery";
import {Registration} from "../../../features/auth/regist-page/Regist";
import {Login} from "../../../features/auth/login-page/Login";
import {PacksList} from "../../../features/card-training/packslist-page/PacksList";
import {CardsList} from "../../../features/card-training/cardslist-page/CardsList";
import {EmptyCardsList} from "../../../features/card-training/empty-cardslist-page/EmptyCardsList";
import {PaginatorContainer} from "../../../features/packCardManager/page/PaginatorContainer";


import {CheckEmail} from "../../../features/auth/forgotPassword/checkEmail/CheckEmail";


export const PATH = {
    LOGINPAGE: '/login',
    NEWPASSPAGE: '/new_pass/:tokenId',
    PROFILEPAGE: '/profile',
    RECOVERYPAGE: '/recovery',
    REGISTRATIONPAGE: '/regist',
    PACKSLISTPAGE: '/packslist',
    CARDSLISTPAGE: '/cardslist/:id',
    EMPTYCARDSLISTPAGE: '/emptycardsslist',
    CARDS: '/cards',
    CHECK_EMAIL: '/check-email',

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
                <Route path={PATH.PACKSLISTPAGE} element={<PacksList/>}/>
                <Route path={PATH.CARDSLISTPAGE} element={<CardsList/>}/>
                <Route path={PATH.EMPTYCARDSLISTPAGE} element={<EmptyCardsList/>}/>
                <Route path={PATH.CARDS} element={<PaginatorContainer/>}/>
                <Route path={'*'} element={<Error404/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
 {/*               <Route path={'*'} element={<Error404/>}/>*/}
            </Routes>
        </>
    )
}
