import React from 'react'
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";
import Login from "../pages/Login/Login";
import RegisterGroup from "../../src/pages/RegisterGroupPages/RegisterGroup";

interface RouteProps {
    page:  React.ComponentType
    path: string
}

export function getUnAuthenticatedRoutes(): RouteProps[] {
    return [
        {
            page: RegisterGroup,
            path: '/register'
        },
        {
            page: Login,
            path: '/login'
        },
        {
            page: PasswordRecovery,
            path: '/recovery-password',
        },
    ]
}

export function getPrivateRoutes(): RouteProps[] {
    return []
}