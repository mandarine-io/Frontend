import * as yup from 'yup'

export type CodeRecoveryForm = {
    code: string
}
export const codeRecoveryFormSchema = yup
    .object({
        code: yup.string().required('Поле обязательно для заполнения')
            .length(6, 'Длина кода 6 символов')
    })
    .required()
