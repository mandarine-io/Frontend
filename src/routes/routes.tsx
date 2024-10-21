import React from 'react'
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login";
import MasterProfile from "../pages/MasterProfile/MasterProfile";

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
            page: MasterProfile,
            path: '/profile'
        }
    ]
}

export function getPrivateRoutes(): RouteProps[] {
    return [
    ]
}