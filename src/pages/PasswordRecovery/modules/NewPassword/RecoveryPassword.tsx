import React, {useEffect, useState} from "react";
import {
    IonAlert,
    IonButton,
    IonCardContent,
    IonContent,
    IonIcon,
    IonInput,
    IonPage,
    IonText,
    useIonLoading,
    useIonRouter
} from "@ionic/react";
import logoWithoutText from "../../../../assets/logoWithoutText.svg";
import {Controller, useForm} from "react-hook-form";
import {chevronBackOutline} from "ionicons/icons";
import {useRecoveryContext} from "../../PasswordRecovery.context";
import {PasswordRecoveryForm, passwordRecoveryFormSchema} from "./RecoveryPassword.schema";
import {yupResolver} from "@hookform/resolvers/yup";
import '../../PasswordRecovery.css'
import '../../../../main.css'
import {ErrorResponse} from "../../../../api/createRequest";
import {sendNewPassword} from "../../../../api/v0/account/account.requests";

const RecoveryPassword : React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const {state, updateState} = useRecoveryContext();
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertHeader, setAlertHeader] = useState('');

    const handleGoRoot = () => {
        router.push('/', 'root');
    };

    const handlePasswordRecovery = async (data : PasswordRecoveryForm) => {
        try {
            await present('Подождите...');
            updateState({password: data.password});

            if (state?.email === undefined || state?.code === undefined) {
                throw {
                    message: "Отсутствует почта или код",
                    path: "/api/v0/auth/reset-password",
                    status: 400,
                    timestamp: new Date().toISOString(),
                };
            }
            await sendNewPassword(state?.email, state?.code, data.password);

            await dismiss();

            setAlertHeader("Успешно!");
            setAlertMessage("Пароль обновлён");
            setIsOpenAlert(true)

            handleGoRoot();
        } catch (error) {
            const response  = error as ErrorResponse
            await dismiss()
            setAlertHeader("Ошибка!");
            switch (response.status) {
                case 400:
                    setAlertMessage("Введенные данные не корректные");
                    break;
                case 404:
                    setAlertMessage("Пользователь не найден");
                    break;
                case 500:
                    setAlertMessage("Внутренняя ошибка сервера");
                    break;
                default:
                    setAlertMessage("Ошибка сервера");
                    break;
            }
            setIsOpenAlert(true)
        }
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset } = useForm<PasswordRecoveryForm>({
        resolver: yupResolver(passwordRecoveryFormSchema),
        mode: 'onBlur',
    });

    useEffect(() => {
        reset();
    }, [state?.step]);

    if (!state || state.step !== 3) {
        return <></>
    }

    return (
        <IonPage>
            <IonContent>
                <div className="logo-container">
                    <img src={logoWithoutText} alt="logo"/>
                    <IonText>
                        <h1>Восстановление пароля</h1>
                    </IonText>
                </div>
                <IonCardContent className="ion-margin">
                    <form onSubmit={handleSubmit(handlePasswordRecovery)}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { onChange, onBlur, value }}) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.password ? 'error' : ''}`}
                                        label="Пароль"
                                        color="primary"
                                        type="password"
                                        labelPlacement="floating"
                                        value={value}
                                        onIonInput={(e) => onChange(e.detail.value)}
                                        onBlur={onBlur}
                                    >
                                    </IonInput>
                                    <IonText color="danger">{errors.password?.message}</IonText>
                                </>
                            )}
                        />
                        <Controller
                            name="passwordConfirm"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.passwordConfirm ? 'error' : ''}`}
                                        label="Повторите пароль"
                                        color="primary"
                                        type="password"
                                        labelPlacement="floating"
                                        value={value}
                                        onIonInput={(e) => onChange(e.detail.value)}
                                        onBlur={onBlur}
                                    >
                                    </IonInput>
                                    <IonText color="danger">{errors.passwordConfirm?.message}</IonText>
                                </>
                            )}
                        />
                        <IonButton
                            style={{marginTop: "60px"}}
                            expand="block"
                            type="submit"
                            color={"primary"}>
                            <IonText color="light">Задать пароль</IonText>
                        </IonButton>
                        <IonButton
                            className="ion-margin-top"
                            expand="block"
                            fill="clear"
                            color={"primary"}
                            onClick={handleGoRoot}>
                            <IonIcon icon={chevronBackOutline} style={{ marginBottom: '2px' }}/>
                            <IonText style={{ marginLeft: '3px' }}>Вернуться на экран входа</IonText>
                        </IonButton>
                    </form>
                    <IonAlert
                        isOpen={isOpenAlert}
                        header={alertHeader}
                        message={alertMessage}
                        buttons={['Закрыть']}
                        onDidDismiss={() => setIsOpenAlert(false)}
                    />
                </IonCardContent>
            </IonContent>
        </IonPage>
    )
}

export default RecoveryPassword;