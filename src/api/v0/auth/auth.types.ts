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