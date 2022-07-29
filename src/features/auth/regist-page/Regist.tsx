import {Button, FormControl, FormGroup, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate, NavLink} from "react-router-dom";
import {AppStoreType} from "../../../app/store";
import {registrationTC} from "./registReducers/regist-reducer";
import '../auth.css'
import style from './Regist.module.css'
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";
import {useAppDispatch} from "../../../app/hooks";


export const Registration = () => {

    const isRegistered = useSelector<AppStoreType>(state => state.registration.isRegistered)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 2) {
                errors.password = 'length not corrected'
            }
            if (!values.repeatPassword) {
                errors.repeatPassword = 'Required';
            } else if (values.repeatPassword.length < 2) {
                errors.repeatPassword = 'length not corrected'
            }
            if (values.password !== values.repeatPassword && values.repeatPassword) {
                errors.repeatPassword = 'Different passwords';
            }
            return errors;
        },

        onSubmit: values => {
            formik.resetForm()
            dispatch(registrationTC(values))
        },
    })

    if (isRegistered) {
        return <Navigate to={PATH.LOGINPAGE}/>
    }

    return (
        <div className={'auth'}>
            < div className={'auth_container'}>
                <h1>Registration page</h1>
                <form onSubmit={formik.handleSubmit} className={style.form}>
                    <FormControl>
                        <FormGroup>
                            <TextField label='Email' margin='normal'
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email && formik.touched.email
                                && <div style={{color: 'red'}}> {formik.errors.email} </div>}

                            <TextField type='password' label='Password'
                                       margin='normal'  variant={'standard'}

                                       {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password && formik.touched.password
                                && <div style={{color: 'red'}}> {formik.errors.password} </div>}

                            <TextField type='password' label='Repeat password'
                                       margin='normal'  variant={'standard'}
                                       {...formik.getFieldProps('repeatPassword')}
                            />
                            {formik.errors.repeatPassword && formik.touched.repeatPassword
                                && <div style={{color: 'red'}}> {formik.errors.repeatPassword} </div>}

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                registration
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
                <span style={{paddingTop: '5px'}}>Do you already have an account?</span>
                <NavLink to={PATH.LOGINPAGE}>Sign In</NavLink>
            </div>
        </div>
    )
}


type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}

