import * as yup from 'yup';

export type ConfirmRegisterForm = {
    otp: string;
};

export const confirmRegisterFormSchema = yup.object({
    otp: yup
        .string()
        .required('Поле обязательно для заполнения')
        .matches(/^\d{6}$/, 'Код должен состоять из 6 цифр'),
});