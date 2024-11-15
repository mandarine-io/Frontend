import * as yup from 'yup'

export type MailRecoveryForm = {
    email: string
}
export const mailRecoveryFormSchema = yup
    .object({
        email: yup.string().required('Поле обязательно для заполнения')
    })
    .required()
