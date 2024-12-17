import { createRequest } from "../../createRequest"
import { projectConfig } from "../../../config"
import {LoginInput, LoginOutput, RegisterInput, socialLoginCallbackInput, SocialLoginInput} from "./auth.types"

const BACKEND_URL = `${projectConfig.serviceConfig.backendUrl}/v0/auth`

export async function loginRequest(input: LoginInput): Promise<LoginOutput> {
    return await createRequest<LoginOutput>({
        url: `${BACKEND_URL}/login`,
        method: 'POST',
        data: input,
    })
}

export async function refreshRequest(): Promise<LoginOutput> {
    return await createRequest<LoginOutput>({
        url: `${BACKEND_URL}/refresh`,
        method: 'GET',
    })
}

export const registerRequest = async (input: RegisterInput) => {
    return await createRequest({
        url: `${BACKEND_URL}/register`,
        method: 'POST',
        data: input,
    })
}

export const logoutRequest = async () => {
    return await createRequest({
        url: `${BACKEND_URL}/logout`,
        method: 'GET',
        authorized: true,
    })
}

export const socialLogin = async  (input: SocialLoginInput)=> {
    return await createRequest({
        url: `${BACKEND_URL}/social/${input.provider}?redirectUrl=${input.redirectUrl}`,
        method: 'GET',
    })
}

export async function socialLoginCallback(input: socialLoginCallbackInput): Promise<LoginOutput> {
    return await createRequest({
        url: `${BACKEND_URL}/social/${input.provider}/callback`,
        method: 'POST',
        data: {
            code: input.code,
            state: input.state,
        },
    })
}

