import {createRequest, ErrorResponse} from "../../createRequest";
import { projectConfig } from "../../config";

const BACKEND_URL = projectConfig.serviceConfig.backendUrl

export async function sendEmail(email: string) {
    return createRequest<ErrorResponse>({
        url: `${BACKEND_URL}/v0/auth/recovery-password`,
        method: 'POST',
        data: email,
    })
}

export async function sendCode(email: string, code: string) {
    return createRequest<ErrorResponse>({
        url: `${BACKEND_URL}/v0/auth/recovery-password/verify`,
        method: 'POST',
        data: {
            email: email,
            otp: code,
        }
    })
}

export async function sendNewPassword(email: string, code: string, password: string) {
    return createRequest<ErrorResponse>({
        url: `${BACKEND_URL}/v0/auth/reset-password`,
        method: 'POST',
        data: {
            email: email,
            otp: code,
            password: password,
        }
    })
}