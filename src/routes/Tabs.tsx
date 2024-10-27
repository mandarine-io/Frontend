import React from 'react'
import {IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet} from '@ionic/react'

import { Route, Redirect } from 'react-router'
import profile from '../assets/profile.svg'
import search from '../assets/search.svg'
import setting from '../assets/settings.svg'
import { getPrivateRoutes } from "./routes";

const Tabs: React.FC = () => {
    const privateRoutes = getPrivateRoutes()
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/tabs" exact>
                    <Redirect to="/tabs/search"/>
                </Route>

                {privateRoutes.map((route, index) => (
                    <Route key={index} path={route.path} exact component={route.page}/>
                ))}
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color={"secondary"}>
                <IonTabButton tab="search" href="/tabs/search">
                    <IonIcon icon={search}/>
                    <IonLabel>Главная</IonLabel>
                </IonTabButton>

                <IonTabButton tab="profile" href="/tabs/profile">
                    <IonIcon icon={profile}/>
                    <IonLabel>Профиль</IonLabel>
                </IonTabButton>

                <IonTabButton tab="setting" href="/tabs/setting">
                    <IonIcon icon={setting}/>
                    <IonLabel>Настройки</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
};

export default Tabs;