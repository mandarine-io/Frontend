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
import {confirmRegisterRequest} from "../../api/v0/auth/auth.requests";
import logoWithoutText from "../../assets/logoWithoutText.svg";
import {ErrorResponse} from "../../api/createRequest";
import {Controller, useForm} from "react-hook-form";
import {useRegistrationContext} from "../../contexts/RegisterContext/RegisterContext";
import {ConfirmRegisterForm, confirmRegisterFormSchema} from "./ConfirmRegisterPage.schema";
import {yupResolver} from "@hookform/resolvers/yup";

const ConfirmRegister: React.FC = () => {
    const router = useIonRouter();
    const [registrationState] = useRegistrationContext();
    const [present, dismiss] = useIonLoading();
    const [alertMessage, setAlertMessage] = useState('');
    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const {handleSubmit, control, formState: {errors}} = useForm<ConfirmRegisterForm>({
        resolver: yupResolver(confirmRegisterFormSchema),
        mode: 'onBlur',
    })

    const handleConfirm = async (data: ConfirmRegisterForm) => {
        try {
            const email = registrationState.email;
            if (!email) {
                throw {
                    message: "Отсутствует почта",
                    path: "/api/v0/auth/recovery-password/verify",
                    status: 400,
                    timestamp: new Date().toISOString(),
                };
            }
            await present('Подождите...')
            const confirmRegisterInput = {
                email: email,
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

    return (
        <IonPage>
            <IonContent>
                <div className='container-success'>
                    <img src={logoWithoutText} alt="logo" width="70px"/>
                    <IonText>
                        <h1>Подтвердите ваш адрес почты</h1>
                    </IonText>
                </div>
                <IonCardContent>
                    <IonText className="container-enter-otp">
                        <h3>Введите 6 чисел, которые мы вам отправили, чтобы подтвердить ваш аккаунт</h3>
                    </IonText>
                    <form onSubmit={handleSubmit(handleConfirm)}>
                        <Controller
                            name="otp"
                            control={control}
                            render={({field}) => (
                                <>
                                    <IonInput
                                        className={`auth-input ${errors.otp ? 'error' : ''}`}
                                        type='text'
                                        value={field.value}
                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                        onBlur={field.onBlur}
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
                    onDidDismiss={() => setIsOpenAlert(false)}
                />
            </IonContent>
        </IonPage>
    )
}

export default ConfirmRegister;