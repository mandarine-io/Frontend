import {RegistrationContextProvider} from "../../contexts/RegisterContext/RegisterContext";
import Register from "../Register/Register";
import ConfirmRegister from "./ConfirmRegister";
import RegisterSuccess from "./RegisterSuccess";
import React from "react";
import {IonRouterOutlet} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";

const ConfirmRegisterProvider: React.FC = () => {
    return (
        <RegistrationContextProvider>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/register/confirm" component={ConfirmRegister} />
                    <Route exact path="/register/success" component={RegisterSuccess} />
                </IonRouterOutlet>
            </IonReactRouter>
        </RegistrationContextProvider>
    )
}

export default ConfirmRegisterProvider;