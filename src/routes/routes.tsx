import React from 'react'
import Register from "../pages/Register/Register"
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
        }
    ]
}

export function getPrivateRoutes(): RouteProps[] {
    return [
    ]
}