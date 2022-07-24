import React from 'react'
import s from './Login.module.css'
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {PATH} from "../../RoutesBlock/RoutesBlock";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";



export const Login = () => {
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 3) {
                errors.password = 'Small password!'
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm()
        },
    })
    return (
        <div className={s.login}>
            <div className={s.login_container}>

                <h1>Sign in</h1>

                <form onSubmit={formik.handleSubmit}
                      className={s.form}>

                    <TextField
                        error={formik.touched.email && formik.errors.email ? true : undefined}
                        variant={'standard'}
                        id={'email'}
                        name={'email'}
                        label={'Email'}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    <TextField
                        error={formik.touched.password && formik.errors.password ? true : undefined}
                        variant={'standard'}
                        id={'password'}
                        name={'password'}
                        value={formik.values.password}
                        label={'Password'}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    <div style={{justifyContent: 'start'}}>
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}/>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'end'}}>

                        <NavLink style={{textDecoration: 'none'}} to={PATH.NEWPASSPAGE}>Forgot password?</NavLink>

                    </div>

                    <Button type='submit' variant={'contained'}>Sign Up</Button>

                </form>
                <span>Dont have an account?</span>
                <NavLink to={PATH.REGISTRATIONPAGE}>Sign In</NavLink>


            </div>
        </div>

    )
}
