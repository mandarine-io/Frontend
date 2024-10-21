import React, {useState} from "react";
import './MasterProfile.css'
import {
    IonAlert,
    IonAvatar,
    IonCardContent,
    IonContent,
    IonPage, IonText,
} from "@ionic/react";
import header from "../../assets/MasterProfile/headerMasterProfile.svg";
import avatar from "../../assets/MasterProfile/avatarMaster.png"

const MasterProfile: React.FC = () => {
    const [masterInfo, setMasterInfo] = useState(
        {
            displayName: 'Иванова Анна',
            job: 'Мастер маникюра',
            description: 'Оописание пиздец описание крутоеписание пиздец описание крутое',
            address: 'г.Новосибирск, ул.Пирогова 4'
        });
    const [alertMessage, setAlertMessage] = useState('');
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const masterRating: number = 4.7;

    return (
        <IonPage id="main-content">
            <IonContent>
                <div style={{position: "relative"}}>
                    <img src={header} alt="header" className="header"/>
                    <IonAvatar>
                        <img src={avatar} alt="avatar" className="avatar"/>
                    </IonAvatar>
                    <div className="master-rating">
                        <span>
                            {masterRating}
                        </span>
                    </div>
                </div>

                <IonCardContent className="master-container">
                    <IonText color="primary">
                        <div className="master-name">
                            {masterInfo?.displayName}
                        </div>
                    </IonText>
                    <IonText color="secondary">
                        <div className="master-profession">
                            {masterInfo?.job}
                        </div>
                    </IonText>
                    <IonText color="medium">
                        <div className="master-description">
                            {masterInfo?.description}
                        </div>
                        <div className="master-address">
                            Адрес: <u>{masterInfo?.address}</u>
                        </div>
                    </IonText>

                    <IonAlert
                        isOpen={isOpenAlert}
                        header="Ошибка!"
                        message={alertMessage}
                        buttons={['Закрыть']}
                        onDidDismiss={() => setIsOpenAlert(false)}
                    />
                </IonCardContent>
            </IonContent>
        </IonPage>
    );
}

export default MasterProfile;