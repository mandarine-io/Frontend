import axios from 'axios'
import { FC, useMemo } from 'react'
import { useIonRouter } from '@ionic/react';

import { ServerError } from '../../api/createRequest'
import { useAuthContext } from '../../contexts/AuthContext/AuthContext'
import { WithChildren } from "../types/WithChildren";

export const AuthInterceptor: FC<WithChildren> = ({ children }) => {
    const { authClient, authState } = useAuthContext()
    const router = useIonRouter()

    useMemo(() => {
        axios.interceptors.request.use(async (config) => {
            if (authClient.isAccessTokenExpired()) {
                try {
                    await authClient.refresh()
                } catch (error) {
                    const serverError = error as ServerError
                    console.log(serverError.message)
                    router.push('/', 'root');
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
