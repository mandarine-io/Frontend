export type LoginInput = {
    login: string
    password: string
}

export type LoginOutput = {
    accessToken: string
}

export type RegisterInput = {
    email: string
    password: string
    username: string
}

export type SocialLoginInput = {
    provider: string
    redirectUrl: string
}

export type socialLoginCallbackInput = {
    provider: string
    code: string
    state: string
}
