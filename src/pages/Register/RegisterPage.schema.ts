import * as yup from 'yup'
import zxcvbn from 'zxcvbn'

export type RegisterForm = {
    username: string
    email: string
    password: string
    passwordConfirm: string
}

export const registerFormSchema = yup
    .object({
        username: yup.string()
            .required('Поле обязательно для заполнения')
            .matches(/^[a-z][a-z0-9_]{1,255}$/u,'Пример: name52'),
        email: yup.string().required('Поле обязательно для заполнения')
                                .matches(/^(?:[a-zA-Z\d!#$%&'*+/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(?:\.[a-zA-Z\d!#$%&'*+/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*")@(?:[a-zA-Z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF](?:[a-zA-Z\d\-~.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-zA-Z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}$/u,'Неверный формат почты'),
        password: yup.string().required('Поле обязательно для заполнения')
                                .test('password-strength', 'Пароль слишком слабый', value => {
                                    if (!value) return false
                                    const result = zxcvbn(value)
                                    return result.score >= 3
                                }),
        passwordConfirm: yup.string().required('Поле обязательно для заполнения')
                                .oneOf([yup.ref('password')], 'Пароли должны совпадать'),    })
    .required()
