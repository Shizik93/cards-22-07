import React, {useState} from 'react'
import '../auth.css'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useParams} from "react-router-dom";
import s from './NewPassword.module.css'
import {Button, Input, TextField} from "@mui/material";

export const NewPass = () => {


    const dispatch = useAppDispatch()
    const newPass = false/*useAppSelector((state) => state.restorePassword.newPass)*/
    const [newPassword, setNewPassword] = useState('')
    const onChangeNewPassword = (e: React.FormEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value)

    }
    const {tokenId} = useParams()

    return (
        <div className={'auth'}>
            <div className={'auth_container'}>


                <div>
                    <div className={s.newPassword}>
                        <h1>Create new password</h1>
                        <div>
                            <Input defaultValue={newPassword}  type={'password'}
                                    placeholder={'Password'}/>
                        </div>
                        <div className={s.text}>
                            <span>Create new password and we will send you further instructions to email</span></div>
                        <Button variant={'contained'}
                            className={s.superButton}
                            onClick={() => {
                                //if (tokenId)
                                // dispatch(newPasswordTC(newPassword, tokenId))
                            }}>Create new password
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    )
}
