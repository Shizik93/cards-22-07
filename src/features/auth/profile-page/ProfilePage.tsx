import React, {useEffect, useState} from 'react'
import {Navigate} from "react-router-dom";
import styles from './profile.module.css'
import hacker from './hacker.png'
import {AuthMeThunk, UpdateUserThunk} from "./profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Button, Grid} from "@mui/material";
import SuperEditableSpan from "../../../common/components/superComponents/c4-SuperEditableSpan/SuperEditableSpan";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";


export const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.login.isAuth)
    const profileData = useAppSelector(state => state.login)
    const [nikName, setNikName] = useState<string>(profileData.name === null ? 'your name' : profileData.name)
    const onEventHandler = () => {
        changeNikName(nikName)
    }
    const changeNikName = (newName: string) => {
        if (newName) {
            dispatch(UpdateUserThunk({name: newName}))
        }
    }
    // useEffect(() => {
    //     dispatch(AuthMeThunk())
    // }, [])

    if (!isAuth) {
        return <Navigate to={PATH.LOGINPAGE}/>
    }
    return <>
        <div></div>
        <Grid container justifyContent={'center'}>
            <Grid item className={styles.form}>
                <div>
                    <SuperEditableSpan
                        value={nikName === null ? undefined : nikName}
                        onChangeText={setNikName}
                        onBlur={onEventHandler}
                        onEnter={onEventHandler}
                    />
                </div>
                <div className={styles.profile}>
                    {/*<img src={profileData.avatar?profileData.avatar:hacker} alt={'user image'}/>*/}
                    <img src={profileData.avatar ? profileData.avatar : hacker} alt={'user image'}/>
                </div>
                <Button variant={'contained'} color={'primary'} size={'small'}>Change image</Button>
                <br/>
                email: <div>{profileData.email}</div>

            </Grid>
        </Grid>
    </>




}
