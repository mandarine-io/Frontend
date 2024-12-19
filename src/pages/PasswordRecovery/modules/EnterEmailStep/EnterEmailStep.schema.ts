import * as yup from 'yup'

export type EnterEmailForm = {
    email: string
}
export const enterEmailFormSchema = yup
    .object({
        email: yup.string().required('Поле обязательно для заполнения')
    })
    .required()
