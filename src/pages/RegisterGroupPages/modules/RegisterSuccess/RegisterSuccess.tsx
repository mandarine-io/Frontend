import React from 'react';
import {IonButton, IonCardContent, IonContent, IonPage, IonText, useIonRouter,} from '@ionic/react';
import greenCheckmark from "../../../../assets/greenCheckmark.svg";

const RegisterSuccess: React.FC = () => {
    const router = useIonRouter();

    const handleLogin = () => {
        router.push('/login', 'root');
    };

    return (
        <IonPage>
            <IonContent>
                <IonCardContent>
                    <form onSubmit={handleLogin}>
                        <div className='container-logo-label'>
                            <img src={greenCheckmark} alt="success" width="70px"/>
                            <IonText>
                                <h1>Успешно!</h1>
                            </IonText>
                        </div>
                        <IonButton
                            style={{marginTop: "60px"}}
                            expand="block"
                            type="submit"
                            color="secondary"
                        >
                            <IonText color='white'>На экран входа</IonText>
                        </IonButton>
                    </form>
                </IonCardContent>
            </IonContent>
        </IonPage>
    );
};

export default RegisterSuccess;