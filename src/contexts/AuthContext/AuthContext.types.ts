import { JwtPayload } from 'jwt-decode'

import { Role } from '../user/UserContext'

export type LoginInput = {
    email: string
    password: string
}

export type LoginOutput = {
    accessToken: string
    refreshToken: string
}

export interface AccessJwtPayload extends JwtPayload {
    role: string
    userId: string
    name: string
    email: string
}

export type AuthState = {
    id: string
    name: string
    role: Role
    email: string
    accessToken: string
    refreshToken: string
}

export type AuthClient = {
    login: (input: LoginInput) => Promise<LoginOutput>
    refresh: () => Promise<LoginOutput>
    logout: () => void
    isAuthenticated: () => boolean
    isAccessTokenExpired: () => boolean
}
