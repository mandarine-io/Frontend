import React from 'react'
import Register from "../pages/Register/Register"

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
    ]
}

export function getPrivateRoutes(): RouteProps[] {
    return [
    ]
}