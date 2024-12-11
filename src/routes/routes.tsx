import React from 'react'
import Register from "../pages/Register/Register"
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";

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
            page: PasswordRecovery,
            path: '/recovery-password',
        },
    ]
}

export function getPrivateRoutes(): RouteProps[] {
    return [
    ]
}