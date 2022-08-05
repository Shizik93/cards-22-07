import React from 'react'
import '../../auth.css'
import s from './Recovery.module.css'
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {PATH} from "../../../../common/components/RoutesBlock/RoutesBlock";
import {Navigate, NavLink} from "react-router-dom";
import {Button, Input} from "@mui/material";
import {useFormik} from "formik";
import {FormikErrorType} from "../../login-page/Login";
import {TextField} from "@material-ui/core";
import {setRecoveryEmailTC} from "../forgot-reducer";

export const Recovery = () => {

    const dispatch = useAppDispatch()
    const emailRecovery = useAppSelector(state => state.forgot.email)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setRecoveryEmailTC(values.email))
            formik.resetForm()
        },
    })
    if (emailRecovery) {
        return (
            <Navigate to={PATH.CHECK_EMAIL}/>
        )
    }

    return (
        <div className={'auth'}>
            <div style={{height: '456px'}} className={'auth_container'}>
                <h1>Forgot your password?</h1>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        error={formik.touched.email && formik.errors.email ? true : undefined}
                        name={'email'}
                        onChange={formik.handleChange}
                        placeholder={'Email'}/>
                    {formik.touched.email && formik.errors.email ?
                        <div style={{
                            color: 'red',
                            fontFamily: 'Montserrat',
                            fontStyle: 'normal'
                        }}>{formik.errors.email}</div> : null}
                    <div className={s.text}>
                        <span>Enter your email address and we will send you further instructions</span>
                    </div>
                    <Button

                        variant={'contained'}
                        type={'submit'}>Send Instructions
                    </Button>
                </form>
                <div className={s.text_button_block}>
                    <div className={s.text}>Did you remember your password?</div>
                    <div>
                        <NavLink to={PATH.LOGINPAGE}>Try logging in</NavLink>
                    </div>
                </div>

            </div>
        </div>
    )

}