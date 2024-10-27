import axios from 'axios'
import { FC, useMemo } from 'react'
import { useIonRouter } from '@ionic/react';

import {RequestConfig, ServerError} from '../../api/createRequest'
import { useAuthContext } from '../../contexts/AuthContext/AuthContext'
import { WithChildren } from "../types/WithChildren";
import { refreshRequest } from "../../api/v0/auth/auth.requests";

export const AuthInterceptor: FC<WithChildren> = ({ children }) => {
    const { authClient, authState } = useAuthContext()
    const router = useIonRouter()

    useMemo(() => {
        axios.interceptors.request.use(async (config) => {
            const requestConfig = config as RequestConfig
            if (!requestConfig.authorized) {
                return config
            }
            if (!authClient.isAuthenticated()) {
                try {
                    await refreshRequest()
                } catch (error) {
                    const serverError = error as ServerError
                    console.log(serverError.message)
                    authClient.logout()
                    router.push('/login', 'root');
                    throw error
                }
            }
            const accessToken = authState?.accessToken
            if (accessToken && config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        })
    }, [authClient, router])

    return <>{children}</>
}
