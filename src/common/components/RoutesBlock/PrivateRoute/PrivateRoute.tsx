import React from "react";
import {PATH} from "../RoutesBlock";
import {useAppSelector} from "../../../../app/hooks";
import {Navigate} from "react-router-dom";

type PrivateRouterType = {
    children: JSX.Element
}

export const PrivateRoute = ({children, ...rest}: PrivateRouterType) => {
    const isAuth = useAppSelector((state) => state.login.isAuth)

    if (!isAuth) {
        return <Navigate to={PATH.LOGINPAGE} />
    }
    return children
}
