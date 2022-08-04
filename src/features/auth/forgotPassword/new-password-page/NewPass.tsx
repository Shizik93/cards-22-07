import React from 'react'
import '../../auth.css'
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {Navigate, useParams} from "react-router-dom";
import s from './NewPassword.module.css'
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {FormikErrorType} from "../../login-page/Login";
import {setNewPasswordTC, setRecoveryEmailTC} from "../forgot-reducer";
import {PATH} from "../../../../common/components/RoutesBlock/RoutesBlock";

export const NewPass = () => {
    const dispatch = useAppDispatch()
    const newPass = useAppSelector(state => state.forgot.newPass)
    const {tokenId} = useParams()
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 7) {
                errors.password = 'Small password!'
            }
            return errors
        },
        onSubmit: values => {
            if (tokenId)
                dispatch(setNewPasswordTC(tokenId, values.password))
            formik.resetForm()
        },
    })

    if (newPass) {
        return <Navigate to={PATH.LOGINPAGE}/>
    }
    return (
        <div className={'auth'}>
            <div style={{height: '372px'}} className={'auth_container'}>


                <h1>Create new password</h1>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <TextField onChange={formik.handleChange} variant={'standard'} type={'password'} name={'password'}
                               placeholder={'Password'}/>
                    <div className={s.text}>
                        <span>Create new password and we will send you further instructions to email</span></div>
                    <Button variant={'contained'}
                            className={s.superButton}
                            type={'submit'}
                    >Create new password
                    </Button>
                </form>


            </div>
        </div>
    )
}
