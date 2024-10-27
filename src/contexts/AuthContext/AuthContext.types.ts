import { JwtPayload } from 'jwt-decode'

import { Role } from '../user/Roles.types'
import { LoginInput } from "../../api/v0/auth/auth.types"


export interface AccessJwtPayload extends JwtPayload {
    sub: string
    role: string
    userId: string
    username: string
    email: string
    isEnabled: boolean
    isDeleted: boolean
}

export type AuthState = {
    id: string
    username: string
    role: Role
    email: string
    isEnabled: boolean
    isDeleted: boolean
    accessToken: string
}

export type AuthClient = {
    login: (input: LoginInput) => void
    logout: () => void
    isAuthenticated: () => boolean
}
