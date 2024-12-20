import {
    IonAlert,
    IonButton,
    IonCardContent,
    IonContent,
    IonInput,
    IonPage,
    IonText,
    useIonLoading,
    useIonRouter
} from "@ionic/react";
import {useState} from "react";
import {confirmRegisterRequest} from "../../../../api/v0/auth/auth.requests";
import logoWithoutText from "../../../../assets/logoWithoutText.svg";
import {ErrorResponse} from "../../../../api/createRequest";
import {Controller, useForm} from "react-hook-form";
import {useRegistrationContext} from "../../RegisterContext";
import {ConfirmRegisterForm, confirmRegisterFormSchema} from "./ConfirmRegisterPage.schema";
import {yupResolver} from "@hookform/resolvers/yup";

const ConfirmRegister: React.FC = () => {
    const router = useIonRouter();
    const {registrationState} = useRegistrationContext();
    const [present, dismiss] = useIonLoading();
    const [alertMessage, setAlertMessage] = useState('');
    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const {handleSubmit, control, formState: {errors}} = useForm<ConfirmRegisterForm>({
        resolver: yupResolver(confirmRegisterFormSchema),
        mode: 'onBlur',
    })

    const handleConfirm = async (data: ConfirmRegisterForm) => {
        const email = registrationState.email;
        if (!email) {
            setAlertMessage("Отсутствует почта");
            setIsOpenAlert(true)
        }
        try {
            await present('Подождите...')
            const confirmRegisterInput = {
                email: email!,
                otp: data.otp,
            }
            await confirmRegisterRequest(confirmRegisterInput);
            await dismiss();
            router.push('/register/success', 'forward');
        } catch (error) {
            const response = error as ErrorResponse
            await dismiss()
            setAlertMessage(response.message)
            setIsOpenAlert(true)
        }

    }

    const handleAlertDismiss = () => {
        setIsOpenAlert(false);
        if (alertMessage === "Отсутствует почта") {
            router.push('/register', 'root');
        }
    }

    return (
        <IonPage>
            <IonContent>
                <div className="container-logo-label">
                    <img src={logoWithoutText} alt="logo" width="70px"/>
                    <IonText>
                        <h1>Подтвердите ваш адрес почты</h1>
                    </IonText>
                </div>
                <IonCardContent>
                    <form onSubmit={handleSubmit(handleConfirm)}>
                        <Controller
                            name="otp"
                            control={control}
                            render={({field}) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.otp ? 'error' : ''}`}
                                        type='number'
                                        value={field.value}
                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                        onBlur={field.onBlur}
                                        placeholder="Введите код из письма"
                                    />
                                </>
                            )}
                        />
                        <IonButton
                            style={{marginTop: "60px"}}
                            expand='block'
                            type="submit"
                            color="secondary"
                        >
                            <IonText color='white'>Подтвердить</IonText>
                        </IonButton>
                    </form>
                </IonCardContent>

                <IonAlert
                    isOpen={isOpenAlert}
                    header="Ошибка подтверждения регистрации"
                    message={alertMessage}
                    buttons={['Закрыть']}
                    onDidDismiss={handleAlertDismiss}
                />
            </IonContent>
        </IonPage>
    )
}

export default ConfirmRegister;