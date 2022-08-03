import React, {useState} from 'react'
import {Navigate} from "react-router-dom";
import styles from './profile.module.css'
import hacker from './hacker.png'
import {UpdateUserThunk} from "./profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Button} from "@mui/material";
import SuperEditableSpan from "../../../common/components/superComponents/c4-SuperEditableSpan/SuperEditableSpan";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";


export const ProfilePage = React.memo(() => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.login.isAuth)
    const profileData = useAppSelector(state => state.login)
    const [nikName, setNikName] = useState<string>(profileData.name === null ? 'your name' : profileData.name)
    const [editImage ,setEditImage] = useState(false)
    const onEventHandler = () => {
        changeNikName(nikName)
    }
    const changeNikName = (newName: string) => {
        if (newName) {
            dispatch(UpdateUserThunk({name: newName}))
        }
    }

    if (!isAuth) {
        return <Navigate to={PATH.LOGINPAGE}/>
    }
    return <>
        <div className={styles.container}>
            <h3 className={styles.title}><b>Personal Information</b></h3>
            <div className={styles.avatar}
                 onMouseEnter={()=>setEditImage(true)}
                 onMouseLeave={()=>setEditImage(false)}>
                {/*<img src={profileData.avatar?profileData.avatar:hacker} alt={'user image'}/>*/}
                <img
                    src={profileData.avatar ? profileData.avatar : hacker}
                    alt={'user image'}

                />
                {editImage
                    ?<div className={styles.avatarButton}>
                    <Button variant={'outlined'} color={'inherit'} size={'small'}>new image</Button>
                </div>
                :""}
            </div>

            <div className={styles.name}>
                <b>Name:</b><SuperEditableSpan
                    value={nikName === null ? undefined : nikName}
                    onChangeText={setNikName}
                    onBlur={onEventHandler}
                    onEnter={onEventHandler}
                />
            </div>
            <div className={styles.profileEmail}>
                <b>Email:</b> <span>{profileData.email}</span>
            </div>



        </div>
    </>


})
