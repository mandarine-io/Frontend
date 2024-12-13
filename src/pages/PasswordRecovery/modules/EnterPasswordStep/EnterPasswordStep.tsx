import React, {useState} from "react";
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
import {Controller, ControllerRenderProps, useForm} from "react-hook-form";
import {chevronBackOutline} from "ionicons/icons";
import {useRecoveryContext} from "../../PasswordRecovery.context";
import {EnterPasswordForm, enterPasswordFormSchema} from "./EnterPasswordStep.schema";
import {yupResolver} from "@hookform/resolvers/yup";
import '../../PasswordRecovery.css'
import '../../../../main.css'
import zxcvbn from 'zxcvbn'
import {ErrorResponse} from "../../../../api/createRequest";
import {sendNewPassword} from "../../../../api/v0/auth/auth.requests";
import useAlert from "../../../../common/hooks/useAlert";
import {ProgressBarSafetyPassword} from "../../../../components/ProgressBarSafetyPassword";
import {RegisterForm} from "../../../Register/RegisterPage.schema";

const EnterPasswordStep : React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const {state, updateState} = useRecoveryContext();
    const [passwordStrength, setPasswordStrength] = useState(-1);
    const { isOpenAlert, alertHeader, alertMessage, showAlert, closeAlert } = useAlert();

    const handleGoRoot = () => {
        router.push('/', 'root');
    };

    const handlePasswordRecovery = async (data : EnterPasswordForm) => {
        try {
            await present('Подождите...');
            updateState({step: 3, password: data.password});

            if (state?.email === undefined || state?.code === undefined) {
                showAlert("Произошла ошибка!", "Повторите ввод данных");
                updateState({step: 1});
                return;
            }

            await sendNewPassword(state.email, state.code, data.password);
            await dismiss();

            showAlert("Успешно!", "Пароль обновлён");
            handleGoRoot();
        } catch (error) {
            const response  = error as ErrorResponse;
            await dismiss();

            showAlert("Ошибка!", response.message);
        }
    };

    const handlePasswordIonInput = (value:  string | null | undefined, field:  ControllerRenderProps<EnterPasswordForm, "password">) => {
        const password = value
        field.onChange(password)
        const result = zxcvbn(password);
        setPasswordStrength(result.score);
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch} = useForm<EnterPasswordForm>({
        resolver: yupResolver(enterPasswordFormSchema),
        mode: 'onBlur',
    });

    const passwordValue = watch('password');
    const passwordConfirmValue = watch('passwordConfirm');

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
                            render={({ field }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.password ? 'error' : ''}`}
                                        label="Пароль"
                                        color="primary"
                                        type="password"
                                        labelPlacement="floating"
                                        value={field.value}
                                        onIonInput={(e) => {
                                            field.onChange(e.detail.value);
                                            handlePasswordIonInput(e.detail.value, field);
                                        }}
                                        onBlur={field.onBlur}
                                    >
                                    </IonInput>
                                    <IonText color="danger">{errors.password?.message}</IonText>
                                    <ProgressBarSafetyPassword val={passwordStrength} error={errors.password}/>
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
                            color={"primary"}
                            disabled={
                                passwordStrength < 3
                                || !passwordValue
                                || !passwordConfirmValue
                                || errors.password
                                || errors.passwordConfirm
                        }>
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
                        onDidDismiss={() => closeAlert()}
                    />
                </IonCardContent>
            </IonContent>
        </IonPage>
    )
}

export default EnterPasswordStep;