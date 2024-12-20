import * as yup from 'yup'

export type LoginForm = {
    login: string
    password: string
}

export const LoginFormSchema = yup
    .object({
        login: yup.string().required('Поле обязательно для заполнения'),
        password: yup.string().required('Поле обязательно для заполнения')
        }).required()
