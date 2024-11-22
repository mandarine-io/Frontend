import axios, { AxiosError, AxiosRequestConfig } from 'axios'

axios.defaults.timeout = 30_000 // in milliseconds
axios.defaults.headers.common = { 'Content-Type': 'application/json' }

export interface ErrorResponse {
    message: string
    path: string
    status: number
    timestamp: string
}

export class ServerError extends Error {
    public status: number
    public timestamp: string
    constructor(data: ErrorResponse) {
        super(data.message)
        this.status = data.status
        this.timestamp = data.timestamp
    }
}

export interface RequestConfig extends AxiosRequestConfig {
    authorized?: boolean
}

export async function createRequest<T>(config: RequestConfig): Promise<T> {
    try {
        const { data } = await axios(config)
        return data
    } catch (error) {
        const axiosError = error as AxiosError
        const errorResponse = (axiosError.response?.data as ErrorResponse) || {
            message: 'Внутренняя ошибка сервера',
            timestamp: new Date().toISOString(),
            status: 500,
        }
        throw new ServerError(errorResponse)
    }
}

