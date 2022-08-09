import React, {ChangeEvent, useState} from 'react'
import {useNavigate} from "react-router-dom";
import s from './profile.module.css'
import hacker from './hacker.png'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Button, IconButton, TextField} from "@mui/material";
import editNameLogo from '../../../assets/img/edit_name_logo.png'
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";
import {logOutTC, UpdateUserTC} from "../login-page/login-reducer";
import setAvatarLogo from '../../../assets/img/set_avatar_log.png'
import {useFormik} from "formik";



export const ProfilePage = React.memo(() => {
    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState(false)
    const avatar = useAppSelector(state => state.login.avatar)
    const name = useAppSelector(state => state.login.name)
    const email = useAppSelector(state => state.login.email)
    const UpdateAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (file !== null) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target !== null && name) {
                    dispatch(UpdateUserTC(e.target.result, name))
                }
            }
            reader.readAsDataURL(file[0])
        }

    }
    const changeNikName = (newName: string | null) => {
        if (newName) {
            dispatch(UpdateUserTC(avatar ? avatar : '', newName))
        }
    }
    const navigate = useNavigate()
    const routeChange = () => {
        navigate(PATH.PACKSLISTPAGE)
    }

    const formik = useFormik({
        initialValues: {
            nickname: name,

        },
        validate: (values) => {
            const errors: { nickname?: string } = {}
            if (!values.nickname) {
                errors.nickname = 'Required'
            }

            return errors
        },
        onSubmit: values => {
            changeNikName(values.nickname)
            setEditMode(false)
            formik.resetForm()
        },
    })
    return (

        <div className={'auth'}>
            <div className={'auth_container'}>
                <Button onClick={routeChange} className={s.back_button}>← Back to Packs List</Button>
                <h1>Personal Information</h1>
                <div className={s.avatar_container}>
                    <img className={s.avatar} src={avatar ? avatar : hacker} alt={'user image'}/>
                    <IconButton className={s.avatarButton} color="primary" aria-label="upload picture"
                                component="label">
                        <input onChange={UpdateAvatar} hidden accept="image/*" type="file"/>
                        <img alt={'Avatar Button'} src={setAvatarLogo}/>
                    </IconButton>
                </div>

                <div className={s.text_container}>


                    {!editMode && <div className={s.edite_name_container}>
                      <div className={s.name}>{name === null ? undefined : name}</div>
                      <img onClick={() => setEditMode(true)} src={editNameLogo}/>
                    </div>}
                    {editMode &&
                      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
                        <TextField
                          style={{width: '309px'}}
                          error={formik.touched.nickname && formik.errors.nickname ? true : undefined}
                          onChange={formik.handleChange}
                          type={'text'}
                          name={'nickname'}
                          label={'Nickname'}
                          variant={'standard'}
                          value={formik.values.nickname}
                        />
                          {/* {formik.touched.nickname&&formik.errors.nickname?<div style={{color: 'red'}}>{formik.errors.nickname}</div>:null }*/}
                          {/*   {formik.touched.nickname && formik.errors.nickname ?
                            <div style={{color: 'red'}}>{formik.errors.nickname}</div> : null}*/}

                        <Button style={{
                            left: '245px',
                            top: '-30px',
                            position: 'relative',
                            zIndex: '1',
                            width: '52px',
                            height: '24px'
                        }} disabled={!!formik.errors.nickname} type='submit'
                                variant={'contained'}>SAVE</Button>
                      </form>}
                    <div className={s.email}>{email}</div>
                </div>
                <Button variant={"contained"} className={s.button_logout} onClick={() => {
                    dispatch(logOutTC())
                }}>LogOut</Button>
            </div>


        </div>

    )


})
