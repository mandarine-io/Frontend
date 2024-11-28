import React from 'react'
import ConfirmRegisterProvider from "../pages/ConfirmRegister/ConfirmRegisterProvider";

interface RouteProps {
    page: React.ComponentType
    path: string
}

export function getUnAuthenticatedRoutes(): RouteProps[] {
    return [
        {
            page: ConfirmRegisterProvider,
            path: '/register',
        }
    ]
}

export function getPrivateRoutes(): RouteProps[] {
    return []
}