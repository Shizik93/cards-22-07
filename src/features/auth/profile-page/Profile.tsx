import React from 'react'
import '../auth.css'
import {ProfilePage} from "./ProfilePage";
export const Profile = () => {
	return (
		<div className={'auth'}>
			<div className={'auth_container'}><ProfilePage/></div>
		</div>
	)
}
