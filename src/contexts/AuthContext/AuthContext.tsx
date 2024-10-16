import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { createContainer } from 'react-tracked'
import { Preferences } from '@capacitor/preferences';
import { createRequest } from '../../api/createRequest'
import { AccessJwtPayload, AuthClient, AuthState, LoginOutput } from './AuthContext.types'
import { Role } from '../user/UserContext'

const AUTH_CONTEXT_KEY = 'authState'
const BACKEND_URL = 'https://dev.mandarine-app.ru/api'

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
            const state = await getInitialState();
            setAuthState(state);
        };

        fetchInitialState();
    }, []);

    return [authState, setAuthState] as const;
};



const container = createContainer(useAuthState)

const AuthContextProvider = container.Provider

const useAuthContext = (): { authClient: AuthClient; authState?: AuthState } => {
    const [state, setState] = container.useTracked()

    const updateState = (output: LoginOutput) => {
        const decode = jwtDecode(output.accessToken) as AccessJwtPayload
        const newState: AuthState = {
            id: decode.userId || '',
            name: decode.name || '',
            role: decode.role as Role,
            email: decode.email || '',
            accessToken: output.accessToken,
            refreshToken: output.refreshToken,
        }
        setState(newState)
        Preferences.set({key: AUTH_CONTEXT_KEY, value: JSON.stringify(newState)})
    }

    const authService: AuthClient = {
        login: async (input) => {
            const output = await createRequest<LoginOutput>({
                url: `${BACKEND_URL}/user/authorize`,
                method: 'POST',
                data: input,
            })
            updateState(output)
            return output
        },

        refresh: async () => {
            const output = await createRequest<LoginOutput>({
                url: `${BACKEND_URL}/auth/refresh`,
                method: 'POST',
                data: { accessToken: state?.accessToken },
            })
            updateState(output)
            return output
        },

        logout: () => {
            setState(undefined)
            Preferences.remove({ key: AUTH_CONTEXT_KEY })
            //localStorage.removeItem(AUTH_CONTEXT_KEY)
        },

        isAuthenticated: () => {
            return state !== undefined
        },

        isAccessTokenExpired: () => {
            if (!state?.accessToken) return false
            const expiresIn = jwtDecode(state.accessToken).exp
            return expiresIn === undefined || expiresIn * 1000 < Date.now()
        },
    }

    return { authClient: authService, authState: state }
}

export { AuthContextProvider, useAuthContext }
