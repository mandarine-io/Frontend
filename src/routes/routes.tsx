import React from 'react'
import ConfirmRegisterProvider from "../../src/pages/RegisterGroupPages/RegisterGroup";

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