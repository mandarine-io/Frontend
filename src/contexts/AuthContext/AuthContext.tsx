import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { createContainer } from 'react-tracked'
import { Preferences } from '@capacitor/preferences'
import { AccessJwtPayload, AuthClient, AuthState } from './AuthContext.types'
import { Role } from '../user/Roles.types'
import { LoginOutput } from "../../api/v0/auth/auth.types"
import { loginRequest, logoutRequest } from "../../api/v0/auth/auth.requests"

const AUTH_CONTEXT_KEY = 'authState'

async function getInitialState(): Promise<AuthState | undefined> {
    const result = await Preferences.get({ key: AUTH_CONTEXT_KEY })
    const previousState = result.value
    if (!previousState) {
        return undefined
    }
    return JSON.parse(previousState) as AuthState
}

const useAuthState = () => {
    const [authState, setAuthState] = useState<AuthState | undefined>(undefined);

    useEffect(() => {
        const fetchInitialState = async () => {
            const state = await getInitialState()
            setAuthState(state)
        }
        fetchInitialState()
    }, []);

    return [authState, setAuthState] as const;
}

const container = createContainer(useAuthState)

const AuthContextProvider = container.Provider

const useAuthContext = (): { authClient: AuthClient; authState?: AuthState } => {
    const [state, setState] = container.useTracked()

    const updateState = (output: LoginOutput) => {
        const decode = jwtDecode(output.accessToken) as AccessJwtPayload
        const newState: AuthState = {
            id: decode.sub || '',
            username: decode.username || '',
            role: decode.role as Role,
            email: decode.email || '',
            isEnabled: decode.isEnabled,
            isDeleted: decode.isDeleted,
            accessToken: output.accessToken,
        }
        setState(newState)
        Preferences.set({key: AUTH_CONTEXT_KEY, value: JSON.stringify(newState)})
    }

    const authService: AuthClient = {
        login: async (input) => {
            const output = await loginRequest(input)
            updateState(output)
        },


        logout: async () => {
            if (state?.accessToken !== undefined) {
                await logoutRequest()
            }
            setState(undefined)
            await Preferences.remove({key: AUTH_CONTEXT_KEY})
        },

        isAuthenticated: () => {
            if (state === undefined) return false
            const expires = jwtDecode(state.accessToken).exp
            if (expires === undefined) return false
            return expires > Date.now()
        },
    }

    return { authClient: authService, authState: state }
}

export { AuthContextProvider, useAuthContext }
