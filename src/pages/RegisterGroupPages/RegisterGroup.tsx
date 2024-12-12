import {RegistrationContextProvider} from "./RegisterContext";
import Register from "./modules/Register/Register";
import ConfirmRegister from "./modules/ConfirmRegister/ConfirmRegister";
import RegisterSuccess from "./modules/RegisterSuccess/RegisterSuccess";
import React from "react";
import {IonRouterOutlet} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";

const RegisterGroup: React.FC = () => {
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

export default RegisterGroup;