import {Button} from "@mui/material";
import s from './CheckEmail.module.css'
import checkEmailLogo from '../../../assets/img/check_email.png'

export const CheckEmail = () => {
    return (
        <div className={'auth'}>
            <div style={{height: "408px"}} className={'auth_container'}>
                <h1>Check Email</h1>
                <div>
                    <img alt={'Check Email'} src={checkEmailLogo}/>
                </div>
                <div className={s.text}>
                    <span>We’ve sent an Email with instructions to example@mail.com</span>
                </div>
                <Button className={s.button} variant={'contained'}>Back to Login</Button>
            </div>

        </div>
    )
}