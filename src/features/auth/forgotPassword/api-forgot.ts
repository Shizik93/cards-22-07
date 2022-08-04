import axios, {AxiosResponse} from "axios";
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";

type forgotPasswordResponceType = {
    info: string
    error: string;
}

const instance = axios.create({
        baseURL: 'https://neko-back.herokuapp.com/2.0/',
        withCredentials: true
    }
)

export const ApiForgot = {
    forgotPassword(email: string) {
        return instance.post<null, AxiosResponse<forgotPasswordResponceType>>('auth/forgot', {
            email, // кому восстанавливать пароль
            from: "test-front-admin <AlexKayuda>", // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">	
	password recovery link: 
	<a href='http://localhost:3000/#${PATH.NEWPASSPAGE}/$token$'>
	link</a></div>`
        })
    },
    setNewPassword() {
    },
}