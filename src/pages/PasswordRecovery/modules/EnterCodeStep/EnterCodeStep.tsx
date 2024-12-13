import React
    from "react";
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
import {EnterCodeForm, enterCodeFormSchema} from "./EnterCodeStep.schema";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRecoveryContext} from "../../PasswordRecovery.context";
import '../../PasswordRecovery.css'
import '../../../../main.css'
import {ErrorResponse} from "../../../../api/createRequest";
import {sendEmail, sendCode} from "../../../../api/v0/auth/auth.requests";
import useAlert from "../../../../common/hooks/useAlert";

const EnterCodeStep : React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const {state, updateState } = useRecoveryContext();
    const { isOpenAlert, alertHeader, alertMessage, showAlert, closeAlert } = useAlert();

    const handleGoRoot = () => {
        router.push('/', 'root');
    };

    const handleCodeRecovery = async (data : EnterCodeForm) => {
        try {
            await present('Подождите...');
            if (state?.email === undefined) {
                showAlert("Произошла ошибка!", "Повторите ввод данных");
                updateState({step: 1});
                return;
            }

            await sendCode(state.email, data.code);
            await dismiss();

            updateState({step: 3, code: data.code});
        } catch (error) {
            const response  = error as ErrorResponse

            await dismiss();

            showAlert("Ошибка!", response.message);
        }
    };

    const resendCode = async () => {
        try {
            await present('Подождите...');

            if (state?.email === undefined) {
                showAlert("Произошла ошибка!", "Повторите ввод данных");
                updateState({step: 1});
                return;
            }

            await sendEmail(state.email);

            await dismiss();

            showAlert("Успешно!", "На почту был отправлен код");
        } catch (error) {
            const response = error as ErrorResponse;

            await dismiss();

            showAlert("Ошибка!", response.message);
        }
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch } = useForm<EnterCodeForm>({
        resolver: yupResolver(enterCodeFormSchema),
        mode: 'onBlur',
    });

    const codeValue = watch('code');

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
                            color={"primary"}
                            disabled={!codeValue || errors.code}>
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
                        onDidDismiss={() => closeAlert()}
                    />
                </IonCardContent>
            </IonContent>
        </IonPage>
    )
}

export default EnterCodeStep;