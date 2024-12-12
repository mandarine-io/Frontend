import {createRequest} from "../../createRequest"
import {ConfirmRegisterInput, LoginInput, LoginOutput, RegisterInput} from "./auth.types"
import {projectConfig} from "../../../config";

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

export async function confirmRegisterRequest(input: ConfirmRegisterInput) {
    return await createRequest({
        url: `${BACKEND_URL}/register/confirm`,
        method: 'POST',
        data: input,
    })
}