import React, {useEffect} from 'react'
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button, Grid} from "@material-ui/core";
import styles from './profile.module.css'
import {AuthMeThunk} from "../Auth/auth-reducer";
import hacker from './hacker.png'
import {LogoutThunk} from "../Login/login-reducer";


export const ProfilePage = React.memo( () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const profileData= useAppSelector(state => state.profile)
    const handleLogout = () => {
      dispatch(LogoutThunk())
    }
    useEffect(()=>{
            dispatch(AuthMeThunk())
    },[])

    if (!isAuth){
        return <Navigate to='/login' />
    }
    return <Grid container justifyContent={'center'}>
        <Grid item  className={styles.form}>
            <div className={styles.profile}>
                <img src={profileData.avatar?profileData.avatar:hacker} alt={'user image'}/>
            </div>
            nik name: <div>{profileData.nikName}</div>
            <Button onClick={handleLogout} variant={'contained'} color={'primary'} size={'small'}>Logout</Button>
        </Grid>
    </Grid>
})
