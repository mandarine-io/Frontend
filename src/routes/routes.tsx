import React from 'react'
import Register from "../pages/Register/Register"
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";
import Login from "../pages/Login/Login";

interface RouteProps {
    page:  React.ComponentType
    path: string
}
export function getUnAuthenticatedRoutes(): RouteProps[] {
    return [
        {
            page: Register,
            path: '/register',
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
    return [
    ]
}