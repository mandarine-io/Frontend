import * as yup from 'yup'

export type EnterCodeForm = {
    code: string
}
export const enterCodeFormSchema = yup
    .object({
        code: yup.string().required('Поле обязательно для заполнения')
            .length(6, 'Длина кода 6 символов')
    })
    .required()
