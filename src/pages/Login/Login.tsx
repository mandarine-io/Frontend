import {yupResolver} from '@hookform/resolvers/yup'
import {
    IonAlert,
    IonButton,
    IonCardContent,
    IonContent,
    IonInput,
    IonPage,
    IonText,
    useIonLoading,
    useIonRouter,
} from '@ionic/react'
import React, {useState} from "react"
import logoWithoutText from '../../assets/logoWithoutText.svg'
import {Controller, useForm} from "react-hook-form"
import {LoginForm, LoginFormSchema} from "./Login.schema"
import '../../main.css'
import {ErrorResponse} from "../../api/createRequest"
import './Login.css'
import {useAuthContext} from "../../contexts/AuthContext/AuthContext";
import yandexLogo from '../../assets/yandexLogo.svg'
import mailLogo from '../../assets/mailLogo.svg'
import googleLogo from '../../assets/googleLogo.svg'

const Login: React.FC = () => {
    const router = useIonRouter()
    const [present, dismiss] = useIonLoading()
    const { authClient } = useAuthContext()
    const [alertMessage, setAlertMessage] = useState('')
    const [isOpenAlert, setIsOpenAlert] = useState(false)

    const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(LoginFormSchema),
        mode: 'onBlur',
    });
    const handleLogin = async (data: LoginForm) => {
        try {
            await present('Подождите...')
            const dataInput = {
                login: data.login,
                password: data.password,
            }
            await authClient.login(dataInput)
            await dismiss()
            router.push('/', 'root');
        } catch (error) {
            const response  = error as ErrorResponse
            await dismiss()
            setAlertMessage(response.message);
            setIsOpenAlert(true)
        }
    }


    return (
        <IonPage>
            <IonContent>
                <div className='container-logo-label' >
                    <img src={logoWithoutText} alt="logo" width="70px" />
                    <IonText>
                        <h1>Вход</h1>
                    </IonText>
                </div>
                <div className="logo-container">
                    <img src={yandexLogo} alt="Yandex Logo" className="logo-yandex"/>
                    <img src={mailLogo} alt="Mail Logo" className="logo-mail"/>
                    <img src={googleLogo} alt="Google Logo" className="logo-google"/>
                </div>
                <div className="line-with-text">
                    <span>или</span>
                </div>
                <IonCardContent className="ion-margin">
                    <form onSubmit={handleSubmit(handleLogin)}>

                        <Controller
                            name="login"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.login ? 'error' : ''}`}
                                        label="Логин"
                                        color="primary"
                                        type="email"
                                        labelPlacement="floating"
                                        value={field.value}
                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                        onBlur={field.onBlur}
                                    />
                                    <IonText className={"ion-text-right"} color="danger">{errors.login?.message}</IonText>
                                </>
                            )}
                        />
                        <br/>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.password ? 'error' : ''}`}
                                        label="Пароль"
                                        color="primary"
                                        type="password"
                                        labelPlacement="floating"
                                        value={field.value}
                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                        onBlur={field.onBlur}
                                    />
                                    <IonText className={"ion-text-right"} color="danger">{errors.password?.message}</IonText>
                                </>
                            )}
                        />
                        <IonButton
                            style={{marginTop: "60px"}}
                            expand="block"
                            type="submit"
                            color="secondary"
                            disabled={ errors.password || errors.login }>
                            <IonText color="white">Войти</IonText>
                        </IonButton>
                        <IonButton
                            className="ion-margin-top"
                            fill="outline"
                            expand="block"
                            type="button"
                            color="secondary"
                            onClick={() => {router.push('/recovery-password', 'root')}}>
                            <IonText color="secondary">Восстановить пароль</IonText>
                        </IonButton>
                        <div className='container-has-account'>
                            <IonText className={"ion-margin-end"}>Нет аккаунта?</IonText>
                            <IonText color="secondary" className='text-login' onClick={() => {router.push('/register', 'root')}}>Создать аккаунт</IonText>
                        </div>
                    </form>

                    <IonAlert
                        isOpen={isOpenAlert}
                        header="Ошибка входа"
                        message={alertMessage}
                        buttons={['Закрыть']}
                        onDidDismiss={() => setIsOpenAlert(false)}
                    />
                </IonCardContent>
            </IonContent>
        </IonPage>
    );
};

export default Login;
