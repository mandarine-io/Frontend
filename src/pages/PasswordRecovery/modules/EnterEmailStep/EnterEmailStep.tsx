import React from "react";
import {
    IonAlert,
    IonButton,
    IonCardContent,
    IonContent,
    IonIcon,
    IonInput,
    IonPage,
    IonText,
    useIonLoading, useIonRouter
} from "@ionic/react";
import logoWithoutText from "../../../../assets/logoWithoutText.svg";
import {Controller, useForm} from "react-hook-form";
import {chevronBackOutline} from "ionicons/icons";
import {EnterEmailForm, enterEmailFormSchema} from "./EnterEmailStep.schema";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRecoveryContext} from "../../PasswordRecovery.context";
import '../../PasswordRecovery.css'
import '../../../../main.css'
import {ErrorResponse} from "../../../../api/createRequest";
import {sendEmail} from "../../../../api/v0/auth/auth.requests";
import useAlert from "../../../../common/hooks/useAlert";

const EnterEmailStep: React.FC = ( ) => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const {state, updateState} = useRecoveryContext();
    const { isOpenAlert, alertHeader, alertMessage, showAlert, closeAlert } = useAlert();

    const handleGoRoot = () => {
        router.push('/', 'root');
    };

    const handleEmailRecovery = async (data : EnterEmailForm) => {
        try {
            await present('Подождите...');
            await sendEmail(data.email);

            await dismiss();
            showAlert("Успешно!", "На почту был отправлен код");

            updateState({step: 2, email: data.email});
        } catch (error) {
            const response  = error as ErrorResponse;

            await dismiss()
            console.log(error)
            showAlert("Ошибка!", response.message);
        }
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch} = useForm<EnterEmailForm>({
        resolver: yupResolver(enterEmailFormSchema),
        mode: 'onBlur',
    });

    const emailValue = watch('email');

    if (!state || state.step !== 1) {
        return <></>
    }

    return (
        <IonPage>
            <IonContent>
                <div className="logo-container">
                    <img src={logoWithoutText} alt="logo" />
                    <IonText>
                        <h1>Восстановление пароля</h1>
                    </IonText>
                </div>
                <IonCardContent className="ion-margin">
                    <form onSubmit={handleSubmit(handleEmailRecovery)}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.email ? 'error' : ''}`}
                                        label="Почта"
                                        color="primary"
                                        type="email"
                                        labelPlacement="floating"
                                        value={value}
                                        onIonInput={(e: any) => onChange(e.target.value)}
                                        onBlur={onBlur}
                                    />
                                    <IonText color="danger">{errors.email?.message}</IonText>
                                </>
                            )}
                        />
                        <IonButton
                            style={{marginTop: "60px"}}
                            expand="block"
                            type="submit"
                            color={"primary"}
                            disabled={!emailValue || errors.email}>
                            <IonText color="light">Восстановить пароль</IonText>
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

export default EnterEmailStep;