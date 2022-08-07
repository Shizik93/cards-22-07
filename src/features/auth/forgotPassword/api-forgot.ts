import axios, {AxiosResponse} from "axios";


type ResponceType = {
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
        return instance.post<null, AxiosResponse<ResponceType>>('auth/forgot', {
            email, // кому восстанавливать пароль
            from: "test-front-admin <AlexKayuda>", // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">	
	password recovery link: 
	<a href='http://localhost:3000/#/new_pass/$token$'>
	link</a></div>`
        })
    },
    setNewPassword(tokenId: string, password: string) {
        return instance.post<null, AxiosResponse<ResponceType>>('/auth/set-new-password', {
            password,
            resetPasswordToken: tokenId
        })
    },
}