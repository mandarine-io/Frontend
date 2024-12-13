import * as yup from 'yup'
import zxcvbn from 'zxcvbn'

export type EnterPasswordForm = {
    password : string
    passwordConfirm : string
}
export const enterPasswordFormSchema = yup
    .object({
        password: yup.string().required('Поле обязательно для заполнения')
            .test('password-strength', 'Пароль слишком слабый', value => {
                if (!value) return false
                const result = zxcvbn(value)
                return result.score >= 3
            }),
        passwordConfirm: yup.string().required('Поле обязательно для заполнения')
            .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    })
    .required()
