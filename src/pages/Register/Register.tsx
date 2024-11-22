import { yupResolver } from '@hookform/resolvers/yup'
import {
    IonButton,
    IonContent,
    IonPage,
    IonInput,
    IonCardContent,
    IonText,
    useIonRouter,
    useIonLoading,
    IonAlert,
} from '@ionic/react'
import React, { useState } from "react"
import logoWithoutText from '../../assets/logoWithoutText.svg'
import {Controller, ControllerRenderProps, useForm} from "react-hook-form"
import { registerFormSchema, RegisterForm } from "./RegisterPage.schema"
import '../../main.css'
import { useAuthContext } from "../../contexts/AuthContext/AuthContext"
import zxcvbn from 'zxcvbn'
import { ProgressBarSafetyPassword } from "../../components/ProgressBarSafetyPassword"
import { ErrorResponse } from "../../api/createRequest"
import './Register.css'
import { registerRequest } from "../../api/v0/auth/auth.requests";

const Register: React.FC = () => {
    const router = useIonRouter()
    const [present, dismiss] = useIonLoading()
    const { authClient } = useAuthContext()
    const [passwordStrength, setPasswordStrength] = useState(-1);
    const [alertMessage, setAlertMessage] = useState('')
    const [isOpenAlert, setIsOpenAlert] = useState(false)

    const { handleSubmit, control, formState: { errors } } = useForm<RegisterForm>({
        resolver: yupResolver(registerFormSchema),
        mode: 'onBlur',
    });
    const handleRegister = async (data: RegisterForm) => {
        try {
            await present('Подождите...')
            const dataInput = {
                username: data.username,
                email: data.email,
                password: data.password,
            }
            await registerRequest(dataInput)
            await dismiss()
            router.push('/', 'root');
        } catch (error) {
            const response  = error as ErrorResponse
            await dismiss()
            switch (response.status) {
                case 400:
                    setAlertMessage("Введенные данные не корректные");
                    break;
                case 409:
                    setAlertMessage("Такой пользователь уже существует");
                    break;
                default:
                    setAlertMessage("Ошибка сервера");
                    break;
            }
        }
    }

    const handlePasswordIonInput = (value:  string | null | undefined, field:  ControllerRenderProps<RegisterForm, "password">) => {
        const password = value
        field.onChange(password)
        const result = zxcvbn(password);
        setPasswordStrength(result.score);
    }

    return (
        <IonPage>
            <IonContent>
                <div className='container-logo-label' >
                    <img src={logoWithoutText} alt="logo" width="70px" />
                    <IonText>
                        <h1>Регистрация</h1>
                    </IonText>
                </div>
                <IonCardContent className="ion-margin">
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.username ? 'error' : ''}`}
                                        label="Имя"
                                        color="primary"
                                        type="text"
                                        labelPlacement="floating"
                                        value={field.value}
                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                        onBlur={field.onBlur}
                                    />
                                    <IonText className={"ion-text-right"} color="danger">{errors.username?.message}</IonText>
                                </>
                            )}
                        />
                        <br/>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.email ? 'error' : ''}`}
                                        label="Почта"
                                        color="primary"
                                        type="email"
                                        labelPlacement="floating"
                                        value={field.value}
                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                        onBlur={field.onBlur}
                                    />
                                    <IonText className={"ion-text-right"} color="danger">{errors.email?.message}</IonText>
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
                                        onIonInput={(e) => handlePasswordIonInput(e.detail.value, field)}
                                        onBlur={field.onBlur}
                                    />
                                    <IonText className={"ion-text-right"} color="danger">{errors.password?.message}</IonText>
                                    <ProgressBarSafetyPassword val={passwordStrength} error={errors.password}/>
                                </>
                            )}
                        />
                        <Controller
                            name="passwordConfirm"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.passwordConfirm ? 'error' : ''}`}
                                        label="Подтвердите пароль"
                                        color="primary"
                                        type="password"
                                        labelPlacement="floating"
                                        value={field.value}
                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                        onBlur={field.onBlur}
                                    />
                                    <IonText className={"ion-text-right"} color="danger">{errors.passwordConfirm?.message}</IonText>
                                </>
                            )}
                        />
                        <IonButton
                            style={{marginTop: "60px"}}
                            expand="block"
                            type="submit"
                            color="secondary"
                            disabled={
                                passwordStrength < 3
                                || errors.password
                                || errors.passwordConfirm
                                || errors.email
                                || errors.username
                            }>
                            <IonText color="white">Зарегистрироваться</IonText>
                        </IonButton>
                        <div className='container-has-account'>
                            <IonText className={"ion-margin-end"}>Уже есть аккаунт?</IonText>
                            <IonText color="secondary" className='text-login' onClick={() => {router.push('/', 'root')}}>Войти</IonText>
                        </div>
                    </form>

                    <IonAlert
                        isOpen={isOpenAlert}
                        header="Ошибка регистрации"
                        message={alertMessage}
                        buttons={['Закрыть']}
                        onDidDismiss={() => setIsOpenAlert(false)}
                    />
                </IonCardContent>
            </IonContent>
        </IonPage>
    );
};

export default Register;
