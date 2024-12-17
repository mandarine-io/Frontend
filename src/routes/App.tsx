import { Route } from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact, useIonRouter
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
import React, {useEffect} from "react"
import { useAuthContext } from "../contexts/AuthContext/AuthContext"
import { getUnAuthenticatedRoutes } from "./routes"
import {Redirect} from "react-router";
import { App as CapacitorApp } from '@capacitor/app';
import {socialLoginCallback} from "../api/v0/auth/auth.requests";
import {jwtDecode} from "jwt-decode/build/esm";
import {AccessJwtPayload} from "../contexts/AuthContext/AuthContext.types";
import {ErrorResponse} from "../api/createRequest";

setupIonicReact()

const App: React.FC = () => {
    const { authClient } = useAuthContext()
    const unauthenticatedRoutes = getUnAuthenticatedRoutes()
    const router = useIonRouter()

    useEffect(() => {
        CapacitorApp.addListener('appUrlOpen', async (event) => {
            const url = new URL(event.url)

            if (url.hostname === 'auth-callback') {
                const code = url.searchParams.get('code')
                const state = url.searchParams.get('state')

                if (code && state) {
                    try {
                        //TODO унифицировать не ток на yandex
                        const response = await socialLoginCallback( {
                            provider: 'yandex',
                            code: code,
                            state: state,
                        })

                        if (response.accessToken) {
                            console.log(response.accessToken)
                            //TODO сохранять токен

                            // Перенаправляем пользователя на главную страницу
                            router.push('/', 'root');
                        }
                    } catch (error) {
                        const response  = error as ErrorResponse
                        console.log(response)
                    }
                }
            }
        });
    }, [authClient, router]);

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
