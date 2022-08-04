import React, {ChangeEvent, useEffect, useState} from 'react'
import {Navigate} from "react-router-dom";
import styles from './profile.module.css'
import hacker from './hacker.png'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Button, Grid, Input} from "@mui/material";
import SuperEditableSpan from "../../../common/components/superComponents/c4-SuperEditableSpan/SuperEditableSpan";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";
import {logOutTC, UpdateUserTC} from "../login-page/login-reducer";


export const ProfilePage = React.memo(() => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.login.isAuth)
    const avatar = useAppSelector(state => state.login.avatar)
    const name = useAppSelector(state => state.login.name)
    const email = useAppSelector(state => state.login.email)
    const [nikName, setNikName] = useState<string>(name === null ? 'your name' : name)
    const UpdateAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (file !== null) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target !== null&&name) {
                    dispatch(UpdateUserTC(e.target.result,name))
                }
            }
            reader.readAsDataURL(file[0])
        }

    }
    const onEventHandler = () => {

        changeNikName(nikName)
    }
    const changeNikName = (newName: string) => {
        if (newName) {
            dispatch(UpdateUserTC(avatar ? avatar : '', newName))
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
                    <img src={avatar ? avatar : hacker} alt={'user image'}/>
                </div>
               <Input type={'file'} onChange={UpdateAvatar}/>
                <br/>
                email: <div>{email}</div>
                <Button onClick={() => {
                    dispatch(logOutTC())
                }}>LogOut</Button>
            </Grid>
        </Grid>
    </>


})
