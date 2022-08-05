import {Button} from "@mui/material";
import s from './CheckEmail.module.css'
import checkEmailLogo from '../../../../assets/img/check_email.png'
import {PATH} from "../../../../common/components/RoutesBlock/RoutesBlock";
import {useNavigate} from "react-router-dom";


export const CheckEmail = () => {
    const navigate = useNavigate()
    const routeChange = () => {
        navigate(PATH.LOGINPAGE)
    }
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
                <Button
                    onClick={routeChange} className={s.button} variant={'contained'}>Back to Login</Button>
            </div>

        </div>
    )
}