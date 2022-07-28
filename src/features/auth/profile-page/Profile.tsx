import React from 'react'
import '../auth.css'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";
export const Profile = () => {
	const isAuth=useSelector<AppStoreType>(state => state.login.isAuth)
	if(!isAuth){
		return <Navigate to={PATH.LOGINPAGE}/>
	}
	return (
		<div className={'auth'}>
			<div className={'auth_container'}>ProfilePage</div>
		</div>
	)
}
