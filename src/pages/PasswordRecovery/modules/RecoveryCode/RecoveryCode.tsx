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
import {CodeRecoveryForm, codeRecoveryFormSchema} from "./RecoveryCode.schema";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRecoveryContext} from "../../PasswordRecovery.context";
import '../../PasswordRecovery.css'
import '../../../../main.css'
import {ErrorResponse} from "../../../../api/createRequest";
import {sendEmail, sendCode} from "../../../../api/v0/account/account.requests";

const RecoveryCode : React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const {state, updateState } = useRecoveryContext();
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertHeader, setAlertHeader] = useState('');

    const handleGoRoot = () => {
        router.push('/', 'root');
    };

    const handleCodeRecovery = async (data : CodeRecoveryForm) => {
        try {
            await present('Подождите...');
            updateState(data);

            if (state?.email === undefined) {
                throw {
                    message: "Отсутствует почта",
                    path: "/api/v0/auth/recovery-password/verify",
                    status: 400,
                    timestamp: new Date().toISOString(),
                };
            }

            await sendCode(state?.email, data.code);

            await dismiss();

            updateState({step: 3})
        } catch (error) {
            const response  = error as ErrorResponse
            await dismiss()
            setAlertHeader("Ошибка!");
            switch (response.status) {
                case 400:
                    setAlertMessage("Введенные данные не корректные");
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

    const resendCode = async () => {
        try {
            await present('Подождите...');

            if (state?.email === undefined) {
                throw {
                    message: "Отсутствует почта",
                    path: "/api/v0/auth/recovery-password",
                    status: 400,
                    timestamp: new Date().toISOString(),
                };
            }

            await sendEmail(state?.email)

            await dismiss();

            setAlertHeader("Успешно!");
            setAlertMessage("На почту был отправлен код");
            setIsOpenAlert(true)
        } catch (error) {
            const response = error as ErrorResponse
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
        reset } = useForm<CodeRecoveryForm>({
        resolver: yupResolver(codeRecoveryFormSchema),
        mode: 'onBlur',
    });

    useEffect(() => {
        reset();
    }, [state?.step]);

    if (!state || state.step !== 2) {
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
                    <form onSubmit={handleSubmit(handleCodeRecovery)}>
                        <Controller
                            name="code"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.code ? 'error' : ''}`}
                                        label="Введите код из письма"
                                        color="primary"
                                        type="text"
                                        labelPlacement="floating"
                                        value={value}
                                        onIonInput={(e: any) => onChange(e.target.value)}
                                        onBlur={onBlur}
                                    />
                                    <IonText color="danger">{errors.code?.message}</IonText>
                                </>
                            )}
                        />
                        <IonButton
                            style={{marginTop: "60px"}}
                            expand="block"
                            type="submit"
                            color={"primary"}>
                            <IonText color="light">Подтвердить</IonText>
                        </IonButton>
                        <IonButton
                            className="ion-margin-top"
                            expand="block"
                            fill="outline"
                            color={"primary"}
                            onClick={resendCode}>
                            <IonText>Отправить ещё раз</IonText>
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

export default RecoveryCode;