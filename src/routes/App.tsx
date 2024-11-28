import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../theme/variables.css'
import React from "react"
import { useAuthContext } from "../contexts/AuthContext/AuthContext"
import { getUnAuthenticatedRoutes } from "./routes"
import {Redirect} from "react-router";

setupIonicReact()

const App: React.FC = () => {
    const { authClient } = useAuthContext()
    const unauthenticatedRoutes = getUnAuthenticatedRoutes()

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/">
                        {authClient.isAuthenticated() ? <></> : <Redirect to="/login" />}
                    </Route>

                    {unauthenticatedRoutes.map((route, index) => (
                        <Route key={index} path={route.path} exact component={route.page} />
                    ))}
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
